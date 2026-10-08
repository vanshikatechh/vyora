import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Coupon from "../models/Coupon.js";

import User from "../models/user.js";
import {
  protect,
  adminOnly
} from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

// DASHBOARD
router.get("/dashboard", async (req, res) => {
  try {
    const [
      users,
      products,
      orders,
      revenue
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments({
        status: {
          $ne: "CANCELLED"
        }
      }),
      Order.aggregate([
        {
          $match: {
            status: {
              $ne: "CANCELLED"
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$total"
            }
          }
        }
      ])
    ]);

    res.json({
      users,
      products,
      orders,
      revenue:
        revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// CREATE PRODUCT
router.post("/products", async (req, res) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// UPDATE PRODUCT
router.put(
  "/products/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json(product);
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// DELETE PRODUCT
router.delete(
  "/products/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json({
        message: "Product deleted"
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// ALL ORDERS
router.get("/orders", async (req, res) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "user",
          "name email phone"
        )
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

// UPDATE ORDER STATUS
router.patch(
  "/orders/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true
          }
        );

      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// CREATE COUPON
router.post(
  "/coupons",
  async (req, res) => {
    try {
      const coupon =
        await Coupon.create(req.body);

      res.status(201).json(coupon);
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
);

// ALL COUPONS
router.get(
  "/coupons",
  async (req, res) => {
    try {
      const coupons =
        await Coupon.find().sort({
          createdAt: -1
        });

      res.json(coupons);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;