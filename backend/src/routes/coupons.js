import express from "express";
import Coupon from "../models/Coupon.js";

const router = express.Router();

router.post("/validate", async (req, res) => {
  try {
    const {
      code,
      subtotal
    } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Coupon code required"
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon"
      });
    }

    if (
      coupon.expiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Coupon expired"
      });
    }

    if (
      coupon.usedCount >=
      coupon.usageLimit
    ) {
      return res.status(400).json({
        message: "Coupon usage limit reached"
      });
    }

    if (
      Number(subtotal) <
      coupon.minimumOrder
    ) {
      return res.status(400).json({
        message:
          `Minimum order value is ₹${coupon.minimumOrder}`
      });
    }

    let discount = 0;

    if (coupon.type === "PERCENT") {
      discount =
        Number(subtotal) *
        (coupon.value / 100);

      if (
        coupon.maximumDiscount !== null
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
      Number(subtotal)
    );

    res.json({
      valid: true,
      code: coupon.code,
      discount: Math.round(discount)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;