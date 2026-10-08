import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

// GET CART
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.product");

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ADD TO CART
router.post("/", protect, async (req, res) => {
  try {
    const {
      product,
      size = "",
      color = "",
      quantity = 1
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    const existing = user.cart.find(
      item =>
        item.product.toString() === product &&
        item.size === size &&
        item.color === color
    );

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      user.cart.push({
        product,
        size,
        color,
        quantity: Number(quantity)
      });
    }

    await user.save();

    const updated = await User.findById(
      req.user._id
    ).populate("cart.product");

    res.json(updated.cart);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// UPDATE CART ITEM
router.put("/:productId", protect, async (req, res) => {
  try {
    const {
      size = "",
      color = "",
      quantity
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    const item = user.cart.find(
      cartItem =>
        cartItem.product.toString() ===
          req.params.productId &&
        cartItem.size === size &&
        cartItem.color === color
    );

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    if (Number(quantity) <= 0) {
      user.cart = user.cart.filter(
        cartItem =>
          !(
            cartItem.product.toString() ===
              req.params.productId &&
            cartItem.size === size &&
            cartItem.color === color
          )
      );
    } else {
      item.quantity = Number(quantity);
    }

    await user.save();

    const updated = await User.findById(
      req.user._id
    ).populate("cart.product");

    res.json(updated.cart);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// CLEAR CART
router.delete("/", protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          cart: []
        }
      }
    );

    res.json({
      message: "Cart cleared"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;