import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
} from "lucide-react";

import api from "../lib/apis.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function Product() {

  const { id } = useParams();

  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useStore();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [selectedColor, setSelectedColor] =
    useState("");

  useEffect(() => {

    const loadProduct = async () => {

      setLoading(true);

      try {

        const response =
          await api.get(
            `/products/${id}`
          );

        const data = response.data;



        setProduct(data);

        if (data.sizes?.length) {
          setSelectedSize(
            data.sizes[0]
          );
        }

        if (data.colors?.length) {
          setSelectedColor(
            data.colors[0]
          );
        }

      } catch (err) {

        console.error(err);

        setError(
          "Product could not be loaded."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProduct();

  }, [id]);

  if (loading) {
    return (
      <div className="product-loading">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>{error}</h2>
        <Link to="/shop">
          BACK TO SHOP
        </Link>
      </div>
    );
  }

 const images =
  product.images?.length
    ? product.images.map((image) => {
        if (!image) return "";

        // Already a full URL
        if (
          image.startsWith("http://") ||
          image.startsWith("https://")
        ) {
          return image;
        }

        // Already starts with /images/
        if (image.startsWith("/images/")) {
          return image;
        }

        // If backend gives "images/backpack.jpg"
        if (image.startsWith("images/")) {
          return `/${image}`;
        }

        // If backend gives only "backpack.jpg"
        return `/images/${image}`;
      })
    : [
        "https://placehold.co/700x900?text=VYORA",
      ];

  const discount =
    product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) /
            product.mrp) *
            100
        )
      : 0;

  const isWishlisted =
    wishlist.includes(product._id);

  const handleAddToBag = () => {

    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
    });

    
  };

  return (
    <section className="product-page">

      {/* BREADCRUMB */}
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className="product-layout">

        {/* GALLERY */}
        <div className="product-gallery">

          <div className="thumbnail-list">

            {images.map((image, index) => (
              <button
                key={image + index}
                className={
                  selectedImage === index
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedImage(index)
                }
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                />
              </button>
            ))}

          </div>

          <div className="main-product-image">

            <img
              src={images[selectedImage]}
              alt={product.title}
            />

            {discount > 0 && (
              <span>
                {discount}% OFF
              </span>
            )}

          </div>

        </div>

        {/* INFO */}
        <div className="product-details">

          <h1>{product.brand}</h1>

          <p className="product-title">
            {product.title}
          </p>

          <div className="rating-box">

            <span>
              {product.rating
                ? product.rating.toFixed(1)
                : "New"}

              {product.rating > 0 && (
                <Star
                  size={13}
                  fill="currentColor"
                />
              )}
            </span>

            {product.ratingCount > 0 && (
              <small>
                {product.ratingCount} Ratings
              </small>
            )}

          </div>

          <div className="product-detail-price">

            <strong>
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </strong>

            {product.mrp >
              product.price && (
              <del>
                ₹
                {Number(
                  product.mrp
                ).toLocaleString("en-IN")}
              </del>
            )}

            {discount > 0 && (
              <span>
                {discount}% OFF
              </span>
            )}

          </div>

          <p className="tax-info">
            inclusive of all taxes
          </p>

          <hr />

          {/* SIZE */}
          {product.sizes?.length > 0 && (
            <div className="product-option">

              <div className="option-title">
                <strong>Select Size</strong>
              </div>

              <div className="size-options">

                {product.sizes.map(
                  (size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div className="product-option">

              <div className="option-title">
                <strong>Color</strong>
              </div>

              <div className="color-options">

                {product.colors.map(
                  (color) => (
                    <button
                      key={color}
                      className={
                        selectedColor === color
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedColor(color)
                      }
                    >
                      {color}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

          {/* BUTTONS */}
          <div className="product-actions">

            <button
              className="add-bag-button"
              onClick={handleAddToBag}
            >
              <ShoppingBag size={19} />
              ADD TO BAG
            </button>

            <button
              className={`product-wishlist ${
                isWishlisted
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                toggleWishlist(product._id)
              }
            >
              <Heart
                size={20}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />

              WISHLIST
            </button>

          </div>

          {/* DELIVERY */}
          <div className="delivery-box">

            <h3>DELIVERY & SERVICES</h3>

            <div>
              <Truck />
              <span>
                Fast delivery available
              </span>
            </div>

            <div>
              <RotateCcw />
              <span>
                Easy returns
              </span>
            </div>

            <div>
              <ShieldCheck />
              <span>
                100% secure payment
              </span>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="product-description">

            <h3>
              PRODUCT DETAILS
            </h3>

            <p>
              {product.description ||
                "Premium fashion product from VYORA."}
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}