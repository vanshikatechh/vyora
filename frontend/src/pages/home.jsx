import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCcw
} from "lucide-react";

const categories = [
  {
    name: "Women",
    image: ["/images/red.jpg"],
  },
  {
    name: "Men",
    image: ["/images/coat.jpg"],
  },
  {
    name: "Footwear",
    image: ["/images/heel.jpg"],
  },
  {
    name: "Accessories",
    image: ["/images/ring.jpg"],
  },
];

const trending = [
  {
    brand: "VYORA",
    title: "Oversized Everyday Tee",
    price: 799,
    mrp: 1499,
    image:
      ["/images/tee.jpg"],
  },
  {
    brand: "VYORA STUDIO",
    title: "Minimal Linen Shirt",
    price: 1299,
    mrp: 2199,
    image:
      ["/images/3shirt.jpg"],
  },
  {
    brand: "VYORA",
    title: "Classic Sneakers",
    price: 1799,
    mrp: 2999,
    image:
      ["/images/shoe.jpg"],
  },
  {
    brand: "VYORA",
    title: "Structured Shoulder Bag",
    price: 1499,
    mrp: 2499,
    image:
      ["/images/bag.jpg"],
  }
];

export default function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            <Sparkles size={15} />
            NEW SEASON 2026
          </span>

          <h1>
            YOUR STYLE.
            <br />
            YOUR WAY.
          </h1>

          <p>
            Discover fashion that fits your personality.
            From everyday essentials to statement pieces.
          </p>

          <div className="hero-buttons">
            <Link to="/shop?gender=women" className="primary-btn">
              SHOP WOMEN
              <ArrowRight size={18} />
            </Link>

            <Link to="/shop?gender=men" className="secondary-btn">
              SHOP MEN
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero.jpg"
            alt="Fashion collection"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="feature-strip">
        <div>
          <Truck />
          <div>
            <strong>FAST DELIVERY</strong>
            <span>Across India</span>
          </div>
        </div>

        <div>
          <ShieldCheck />
          <div>
            <strong>SECURE PAYMENT</strong>
            <span>100% protected checkout</span>
          </div>
        </div>

        <div>
          <RefreshCcw />
          <div>
            <strong>EASY RETURNS</strong>
            <span>Simple return process</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>Shop by category</h2>
          </div>

          <Link to="/shop">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${category.name.toLowerCase()}`}
              className="category-card"
            >
              <img src={category.image} alt={category.name} />

              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>
                  SHOP NOW <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="home-section trending-section">
        <div className="section-heading">
          <div>
            <span>WHAT'S HOT</span>
            <h2>Trending now</h2>
          </div>

          <Link to="/shop">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="trending-grid">
          {trending.map((product) => {
            const discount = Math.round(
              ((product.mrp - product.price) / product.mrp) * 100
            );

            return (
              <Link
                to="/shop"
                className="home-product"
                key={product.title}
              >
                <div className="home-product-image">
                  <img src={product.image} alt={product.title} />

                  <span className="sale-badge">
                    {discount}% OFF
                  </span>
                </div>

                <div className="home-product-info">
                  <strong>{product.brand}</strong>
                  <p>{product.title}</p>

                  <div>
                    <b>₹{product.price.toLocaleString("en-IN")}</b>
                    <del>
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </del>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="style-cta">
        <div>
          <span>VYORA STUDIO</span>

          <h2>
            Fashion doesn't
            <br />
            follow rules.
          </h2>

          <p>
            Build your wardrobe around what feels like you.
          </p>

          <Link to="/shop" className="primary-btn">
            EXPLORE COLLECTION
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}