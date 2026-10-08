import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    gender: {
      type: String,
      enum: ["WOMEN" , "MEN" , "KIDS"],
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Men",
        "Women",
        "Kids",
        "Beauty",
        "Home",
        "Accessories",
        "Footwear"
      ]
    },

    subCategory: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    images: {
      type: [String],
      default: []
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    discount: {
      type: Number,
      default: 0
    },

    sizes: {
      type: [String],
      default: []
    },

    colors: {
      type: [String],
      default: []
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    ratingCount: {
      type: Number,
      default: 0
    },

    tags: {
      type: [String],
      default: []
    },

    isFeatured: {
      type: Boolean,
      default: false
    },

    isNew: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.product || 
mongoose.model("Product", productSchema);