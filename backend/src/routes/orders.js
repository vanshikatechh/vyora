import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/user.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod = "COD",
      couponCode = ""
    } = req.body;

    const user = await User.findById(
      req.user._id
    ).populate("cart.product");

    if (!user.cart.length) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let subtotal = 0;

    const items = user.cart.map(item => {
      const product = item.product;

      if (!product) {
        throw new Error(
          "A product in your cart no longer exists"
        );
      }

      if (
        product.stock <
        item.quantity
      ) {
        throw new Error(
          `${product.title} is out of stock`
        );
      }

      const itemTotal =
        product.price *
        item.quantity;

      subtotal += itemTotal;

      return {
        product: product._id,
        title: product.title,
        image: product.images?.[0] || "",
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      };
    });

    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon =
        await Coupon.findOne({
          code: couponCode.toUpperCase(),
          active: true
        });

      if (coupon) {
        if (
          coupon.expiresAt >= new Date() &&
          coupon.usedCount <
            coupon.usageLimit &&
          subtotal >=
            coupon.minimumOrder
        ) {
          if (coupon.type === "PERCENT") {
            discount =
              subtotal *
              (coupon.value / 100);

            if (
              coupon.maximumDiscount !==
              null
            ) {
              discount = Math.min(
                discount,
                coupon.maximumDiscount
              );
            }
          } else {
            discount = coupon.value;
          }

          discount = Math.min(
            discount,
            subtotal
          );

          appliedCoupon = coupon;
        }
      }
    }

    const deliveryFee =
      subtotal - discount >= 999
        ? 0
        : 99;

    const total =
      subtotal -
      discount +
      deliveryFee;

    const order = await Order.create({
      user: user._id,
      items,
      shippingAddress,
      subtotal,
      discount,
      deliveryFee,
      total,
      couponCode:
        appliedCoupon?.code || "",
      paymentMethod
    });

    // Reduce stock
    for (const item of user.cart) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    if (appliedCoupon) {
      await Coupon.findByIdAndUpdate(
        appliedCoupon._id,
        {
          $inc: {
            usedCount: 1
          }
        }
      );
    }

    user.cart = [];

    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// MY ORDERS
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    })
      .populate("items.product")
      .sort({
        createdAt: -1
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// SINGLE ORDER
router.get("/:id", protect, async (req, res) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      ).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (
      order.user.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({
      message: "Invalid order ID"
    });
  }
});

// CANCEL ORDER
router.patch(
  "/:id/cancel",
  protect,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }

      if (
        order.user.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      if (
        [
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "CANCELLED"
        ].includes(order.status)
      ) {
        return res.status(400).json({
          message:
            "Order cannot be cancelled now"
        });
      }

      order.status = "CANCELLED";

      await order.save();

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;