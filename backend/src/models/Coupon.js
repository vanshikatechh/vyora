import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["PERCENT", "FLAT"],
      default: "PERCENT"
    },

    value: {
      type: Number,
      required: true,
      min: 0
    },

    minimumOrder: {
      type: Number,
      default: 0
    },

    maximumDiscount: {
      type: Number,
      default: null
    },

    expiresAt: {
      type: Date,
      required: true
    },

    usageLimit: {
      type: Number,
      default: 100
    },

    usedCount: {
      type: Number,
      default: 0
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Coupon", couponSchema);