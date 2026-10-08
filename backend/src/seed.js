import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Product from "./models/Product.js";
import User from "./models/User.js";
import Coupon from "./models/Coupon.js";

dotenv.config();

const products = [
  // =========================
  // WOMEN — CLOTHING
  // =========================

  {
    title: "Floral Printed Summer Dress",
    brand: "VYORA Studio",
    gender: "WOMEN",
    category: "Women",
    subCategory: "Dresses",
    description: "Elegant floral summer dress with a relaxed silhouette.",
    images: ["/images/sundress.jpg"],
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "White"],
    stock: 40,
    rating: 4.5,
    ratingCount: 128,
    tags: ["dress", "summer", "floral"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Bodycon dress",
    brand: "VYORA Basics",
    gender: "WOMEN",
    category: "Women",
    subCategory: "Gown",
    description: "Relaxed oversized cotton shirt for everyday styling.",
    images: ["/images/bodycon.jpg"],
    price: 999,
    originalPrice: 1999,
    discount: 50,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Blue", "Black"],
    stock: 55,
    rating: 4.4,
    ratingCount: 96,
    tags: ["gown", "oversized", "cotton"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Deep Red Dress",
    brand: "VYORA Denim",
    gender: "WOMEN",
    category: "Women",
    subCategory: "gown",
    description: "Classic Deep red color bodycon dress",
    images: ["/images/reddress.jpg"],
    price: 1799,
    originalPrice: 3299,
    discount: 45,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Red", "Yellow"],
    stock: 35,
    rating: 4.6,
    ratingCount: 211,
    tags: ["gown", "bodycon", "straight"],
    isFeatured: true,
    isNew: false
  },

  {
    title: "Polo T-shirt ",
    brand: "VYORA Basics",
    gender: "WOMEN",
    category: "Women",
    subCategory: "Tops",
    description: "Polo T-shirt with wide leg pants.",
    images: ["/images/wide.jpg"],
    price: 699,
    originalPrice: 1299,
    discount: 46,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "White", "Brown"],
    stock: 60,
    rating: 4.3,
    ratingCount: 88,
    tags: ["top", "crop", "ribbed"],
    isFeatured: false,
    isNew: true
  },

  {
    title: "Formal Outfit",
    brand: "VYORA Edit",
    gender: "WOMEN",
    category: "Women",
    subCategory: "3 coat-set women",
    description: "Brown color 3-set coat",
    images: ["/images/3coatset.jpg"],
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black"],
    stock: 30,
    rating: 4.5,
    ratingCount: 73,
    tags: ["trousers", "wide-leg", "formal"],
    isFeatured: false,
    isNew: true
  },

  // =========================
  // MEN
  // =========================

  {
    title: "Premium Oversized T-Shirt",
    brand: "VYORA Men",
    gender: "MEN",
    category: "Men",
    subCategory: "T-Shirts",
    description: "Heavy cotton oversized t-shirt with a premium finish.",
    images: ["/images/darkblue.jpg"],
    price: 899,
    originalPrice: 1599,
    discount: 44,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey"],
    stock: 70,
    rating: 4.6,
    ratingCount: 184,
    tags: ["tshirt", "oversized", "cotton"],
    isFeatured: true,
    isNew: true
  },


  {
    title: "Ethnic wear",
    brand: "VYORA party",
    gender: "MEN",
    category: "Men",
    subCategory: "kurta",
    description: "Kurta Pajma fit for every festival",
    images: ["/images/ethnic.jpg"],
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    sizes: ["30", "32", "34", "36"],
    colors: ["Black", "Olive", "Beige"],
    stock: 38,
    rating: 4.5,
    ratingCount: 119,
    tags: ["kurta", "pants", "partywear"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Classic Denim Jacket",
    brand: "VYORA Denim",
    gender: "MEN",
    category: "Men",
    subCategory: "Jackets",
    description: "Classic denim jacket with a timeless silhouette.",
    images: ["/images/denim.jpg"],
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    stock: 25,
    rating: 4.7,
    ratingCount: 94,
    tags: ["jacket", "denim", "casual"],
    isFeatured: true,
    isNew: false
  },

   {
    title: "Slim Fit Casual Shirt",
    brand: "VYORA Men",
    gender: "MEN",
    category: "Men",
    subCategory: "Shirts",
    description: "Smart casual slim-fit shirt for everyday wear.",
    images: ["/images/blue.jpg"],
    price: 1199,
    originalPrice: 2299,
    discount: 48,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "White", "Olive"],
    stock: 42,
    rating: 4.4,
    ratingCount: 102,
    tags: ["shirt", "casual", "slim-fit"],
    isFeatured: true,
    isNew: false
  },


  {
    title: "Regular Fit Polo T-Shirt",
    brand: "VYORA Men",
    gender: "MEN",
    category: "Men",
    subCategory: "Polo",
    description: "Classic polo t-shirt made for everyday comfort.",
    images: ["/images/polo.jpg"],
    price: 799,
    originalPrice: 1499,
    discount: 47,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Green"],
    stock: 50,
    rating: 4.3,
    ratingCount: 67,
    tags: ["polo", "tshirt", "casual"],
    isFeatured: false,
    isNew: true
  },

  // =========================
  // KIDS
  // =========================

  {
    title: "Girls Printed Party Dress",
    brand: "VYORA Kids",
    gender: "KIDS",
    category: "Kids",
    subCategory: "Dresses",
    description: "Cute printed party dress for girls.",
    images: ["/images/floral.jpg"],
    price: 899,
    originalPrice: 1699,
    discount: 47,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Pink", "Yellow"],
    stock: 35,
    rating: 4.6,
    ratingCount: 52,
    tags: ["kids", "dress", "girls"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Boys Graphic T-Shirt",
    brand: "VYORA Kids",
    gender: "KIDS",
    category: "Kids",
    subCategory: "T-Shirts",
    description: "Fun graphic t-shirt made from soft cotton.",
    images: ["/images/printed.jpg"],
    price: 499,
    originalPrice: 899,
    discount: 44,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blue", "Black"],
    stock: 60,
    rating: 4.4,
    ratingCount: 81,
    tags: ["kids", "tshirt", "boys"],
    isFeatured: false,
    isNew: true
  },

  {
    title: "Kids Denim Jacket",
    brand: "VYORA Kids",
    gender: "KIDS",
    category: "Kids",
    subCategory: "Jackets",
    description: "Mini denim jacket for stylish everyday looks.",
    images: ["/images/denimkid.jpg"],
    price: 1099,
    originalPrice: 1999,
    discount: 45,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Blue"],
    stock: 25,
    rating: 4.5,
    ratingCount: 43,
    tags: ["kids", "jacket", "denim"],
    isFeatured: true,
    isNew: false
  },

  {
    title: "Kids Cotton Joggers",
    brand: "VYORA Kids",
    gender: "KIDS",
    category: "Kids",
    subCategory: "Bottomwear",
    description: "Soft cotton joggers designed for all-day comfort.",
    images: ["/images/rogger.jpg"],
    price: 699,
    originalPrice: 1299,
    discount: 46,
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Grey", "Black"],
    stock: 48,
    rating: 4.4,
    ratingCount: 61,
    tags: ["kids", "joggers", "cotton"],
    isFeatured: false,
    isNew: true
  },

  // =========================
  // FOOTWEAR
  // =========================

  {
    title: "Minimal White Sneakers",
    brand: "VYORA Footwear",
    gender: "WOMEN",
    category: "Footwear",
    subCategory: "Sneakers",
    description: "Clean everyday sneakers with a minimal design.",
    images: ["/images/white.jpg"],
    price: 1799,
    originalPrice: 3499,
    discount: 49,
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["White"],
    stock: 45,
    rating: 4.6,
    ratingCount: 145,
    tags: ["sneakers", "shoes", "white"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Chunky Street Sneakers",
    brand: "VYORA Street",
    gender: "MEN",
    category: "Footwear",
    subCategory: "Sneakers",
    description: "Statement chunky sneakers for streetwear looks.",
    images: ["/images/chunky.jpg"],
    price: 2299,
    originalPrice: 4499,
    discount: 49,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White"],
    stock: 32,
    rating: 4.5,
    ratingCount: 109,
    tags: ["sneakers", "chunky", "streetwear"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Classic Leather Loafers",
    brand: "VYORA Formal",
    gender: "MEN",
    category: "Footwear",
    subCategory: "Loafers",
    description: "Classic loafers for formal and smart-casual outfits.",
    images: ["/images/loaffer.jpg"],
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Brown", "Black"],
    stock: 28,
    rating: 4.7,
    ratingCount: 76,
    tags: ["loafers", "formal", "leather"],
    isFeatured: false,
    isNew: false
  },

  {
    title: "Platform Casual Sandals",
    brand: "VYORA Footwear",
    gender: "WOMEN",
    category: "Footwear",
    subCategory: "Sandals",
    description: "Comfortable platform sandals for everyday outfits.",
    images: ["/images/sandals.jpg"],
    price: 999,
    originalPrice: 1899,
    discount: 47,
    sizes: ["4", "5", "6", "7", "8"],
    colors: ["Beige", "Black"],
    stock: 40,
    rating: 4.3,
    ratingCount: 58,
    tags: ["sandals", "platform", "women"],
    isFeatured: false,
    isNew: true
  },

  // =========================
  // BEAUTY
  // =========================

  {
    title: "Hydrating Face Serum",
    brand: "VYORA Beauty",
    gender: "WOMEN",
    category: "Beauty",
    subCategory: "Skincare",
    description: "Lightweight hydrating serum for everyday skincare.",
    images: ["/images/serum.jpg"],
    price: 799,
    originalPrice: 1299,
    discount: 38,
    sizes: ["50ml"],
    colors: ["Clear"],
    stock: 80,
    rating: 4.6,
    ratingCount: 214,
    tags: ["serum", "skincare", "hydration"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Matte Lip Color",
    brand: "VYORA Beauty",
    gender: "WOMEN",
    category: "Beauty",
    subCategory: "Makeup",
    description: "Long-lasting matte lip color with a smooth finish.",
    images: ["/images/lip color.jpg"],
    price: 599,
    originalPrice: 999,
    discount: 40,
    sizes: ["One Size"],
    colors: ["Rose", "Nude", "Berry"],
    stock: 90,
    rating: 4.5,
    ratingCount: 167,
    tags: ["lipstick", "makeup", "matte"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Everyday Makeup Kit",
    brand: "VYORA Beauty",
    gender: "WOMEN",
    category: "Beauty",
    subCategory: "Makeup",
    description: "Complete everyday makeup essentials in one kit.",
    images: ["/images/makeupkit.jpg"],
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    sizes: ["One Size"],
    colors: ["Natural"],
    stock: 45,
    rating: 4.4,
    ratingCount: 91,
    tags: ["makeup", "kit", "beauty"],
    isFeatured: true,
    isNew: false
  },

  {
    title: "Gentle Foaming Cleanser",
    brand: "VYORA Skin",
    gender: "WOMEN",
    category: "Beauty",
    subCategory: "Skincare",
    description: "Gentle daily cleanser suitable for everyday skincare.",
    images: ["/images/cleanser.jpg"],
    price: 549,
    originalPrice: 899,
    discount: 39,
    sizes: ["100ml"],
    colors: ["Clear"],
    stock: 75,
    rating: 4.5,
    ratingCount: 133,
    tags: ["cleanser", "skincare", "facewash"],
    isFeatured: false,
    isNew: true
  },

  // =========================
  // ACCESSORIES
  // =========================

  {
    title: "Structured Shoulder Bag",
    brand: "VYORA Accessories",
    gender: "WOMEN",
    category: "Accessories",
    subCategory: "Bags",
    description: "Structured shoulder bag with a premium finish.",
    images: ["images/shoulderbag.jpg"],
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    sizes: ["One Size"],
    colors: ["Black", "Brown"],
    stock: 35,
    rating: 4.6,
    ratingCount: 122,
    tags: ["bag", "shoulder-bag", "accessories"],
    isFeatured: true,
    isNew: true
  },

  {
    title: "Minimal Analog Watch",
    brand: "VYORA Time",
    gender: "MEN",
    category: "Accessories",
    subCategory: "Watches",
    description: "Minimal analog watch with a clean modern dial.",
    images: ["/images/watch.jpg"],
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    stock: 30,
    rating: 4.5,
    ratingCount: 88,
    tags: ["watch", "analog", "accessories"],
    isFeatured: true,
    isNew: false
  },

  {
    title: "Classic Sunglasses",
    brand: "VYORA Accessories",
    gender: "WOMEN",
    category: "Accessories",
    subCategory: "Sunglasses",
    description: "Classic sunglasses with a versatile frame.",
    images: ["/images/glasses.jpg"],
    price: 699,
    originalPrice: 1399,
    discount: 50,
    sizes: ["One Size"],
    colors: ["Black", "Brown"],
    stock: 65,
    rating: 4.4,
    ratingCount: 105,
    tags: ["sunglasses", "eyewear", "accessories"],
    isFeatured: false,
    isNew: true
  },

  {
    title: "Everyday Mini Backpack",
    brand: "VYORA Street",
    gender: "KIDS",
    category: "Accessories",
    subCategory: "Bags",
    description: "Compact everyday backpack with multiple compartments.",
    images: ["/images/backpack.jpg"],
    price: 899,
    originalPrice: 1599,
    discount: 44,
    sizes: ["One Size"],
    colors: ["Black", "Pink", "Blue"],
    stock: 42,
    rating: 4.5,
    ratingCount: 72,
    tags: ["backpack", "kids", "bag"],
    isFeatured: false,
    isNew: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    // Remove old demo products
    await Product.deleteMany({});

    // Add all new products
    await Product.insertMany(products);

    console.log(`${products.length} products seeded successfully`);

    // =========================
    // ADMIN
    // =========================

    const adminEmail = process.env.ADMIN_EMAIL || "admin@vyora.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

    const existingAdmin = await User.findOne({
      email: adminEmail
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      await User.create({
        name: "VYORA Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN"
      });

      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }

    // =========================
    // COUPON
    // =========================

    await Coupon.findOneAndUpdate(
      { code: "WELCOME10" },
      {
        code: "WELCOME10",
        type: "PERCENT",
        value: 10,
        minimumOrder: 999,
        maximumDiscount: 500,
        active: true
      },
      {
        upsert: true,
        new: true
      }
    );

    console.log("Coupon WELCOME10 created/updated");

    await mongoose.connection.close();

    console.log("VYORA database seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error);
    process.exit(1);
  }
}

seed();