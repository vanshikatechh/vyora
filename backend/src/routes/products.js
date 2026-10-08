import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const {
      search,
      gender,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      featured,
      page = 1,
      limit = 24
    } = req.query;

    const query = {};

    if (gender) {
      query.gender = {
        $regex: `^${gender}$`,
        $options: "i",
      };
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          brand: {
            $regex: search,
            $options: "i"
          }
        },
        {
          category: {
            $regex: search,
            $options: "i"
          }
        }
      ];
      
    }

    if (category) {
  const normalizedCategory = category.toLowerCase();

  if (["women", "men", "kids"].includes(normalizedCategory)) {
    query.gender = normalizedCategory.toUpperCase();
  } else {
    query.category = {
      $regex: `${category}$`,
      $options: "i"
    };
  }
}

    if(gender) {
      query.gender = {
        $regex: `${gender}$`,
        $options: "i",
      };
    }

    if (brand) {
      query.brand = {
        $regex: brand,
        $options: "i"
      };
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    let sortOption = {
      createdAt: -1
    };

    if (sort === "price-low") {
      sortOption = { price: 1 };
    }

    if (sort === "price-high") {
      sortOption = { price: -1 };
    }

    if (sort === "rating") {
      sortOption = { rating: -1 };
    }

    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(
          total / Number(limit)
        )
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// FEATURED
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true
    }).limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID"
    });
  }
});

export default router;