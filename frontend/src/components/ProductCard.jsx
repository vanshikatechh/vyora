import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductCard({ product }) {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
  } = useStore();

  const isWishlisted = wishlist.includes(product._id);

  const discount =
    product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : 0;

  const image =
    product.images?.[0] ||
    "https://placehold.co/600x750?text=VYORA";

  return (
    <article className="product-card">

      <div className="product-image-container">

        <Link to={`/product/${product._id}`}>
          <img
            src={image}
            alt={product.title}
            className="product-image"
          />
        </Link>

        {discount > 0 && (
          <span className="product-discount">
            {discount}% OFF
          </span>
        )}

        <button
          className={`wishlist-button ${
            isWishlisted ? "wishlisted" : ""
          }`}
          onClick={() => toggleWishlist(product._id)}
          aria-label="Wishlist"
        >
          <Heart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {product.stock > 0 && (
          <button
            className="quick-add"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag size={16} />
            ADD
          </button>
        )}

      </div>

      <Link
        to={`/product/${product._id}`}
        className="product-card-info"
      >

        <h3>{product.brand}</h3>

        <p>{product.title}</p>

        <div className="product-price">

          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>

          {product.mrp > product.price && (
            <>
              <del>
                ₹{Number(product.mrp).toLocaleString("en-IN")}
              </del>

              <span>
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        {product.rating > 0 && (
          <div className="product-rating">
            <span>
              {product.rating.toFixed(1)}
              <Star size={12} fill="currentColor" />
            </span>

            <small>
              {product.ratingCount || 0}
            </small>
          </div>
        )}

      </Link>
    </article>
  );
}