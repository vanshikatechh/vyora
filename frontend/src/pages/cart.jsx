import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useStore } from "../context/StoreContext.jsx";

export default function Cart() {

  const {
    cart,
    subtotal,
    shippingFee,
    total,
    updateQuantity,
    removeFromCart,
  } = useStore();

  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <section className="empty-cart">

        <div>
          <h1>Your bag is empty</h1>

          <p>
            Add something you love and
            it will appear here.
          </p>

          <Link
            to="/shop"
            className="primary-btn"
          >
            START SHOPPING
            <ArrowRight size={18} />
          </Link>
        </div>

      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="cart-main">

        <div className="cart-heading">

          <div>
            <h1>Shopping Bag</h1>
            <p>
              {cart.reduce(
                (sum, item) =>
                  sum + item.quantity,
                0
              )}{" "}
              items
            </p>
          </div>

          <Link to="/shop">
            Continue shopping
          </Link>

        </div>

        {cart.map((item) => {

          const rawImage = item.product.images?.[0] || "";

const image = rawImage
  ? rawImage
      .replace("http://localhost:5173", window.location.origin)
      .replace("http://127.0.0.1:5173", window.location.origin)
      .replace(/^images\//, "/images/")
  : "https://placehold.co/200x260?text=VYORA";

          return (
            <article
              className="cart-item"
              key={item.key}
            >

              <Link
                to={`/product/${item.product._id}`}
              >
                <img
                  src={image}
                  alt={item.product.title}
                />
              </Link>

              <div className="cart-item-info">

                <h3>
                  {item.product.brand}
                </h3>

                <p>
                  {item.product.title}
                </p>

                {item.size && (
                  <span>
                    Size: {item.size}
                  </span>
                )}

                {item.color && (
                  <span>
                    Color: {item.color}
                  </span>
                )}

                <strong>
                  ₹
                  {Number(
                    item.product.price
                  ).toLocaleString("en-IN")}
                </strong>

                <div className="cart-item-bottom">

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.key,
                          item.quantity - 1
                        )
                      }
                    >
                      <Minus size={15} />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.key,
                          item.quantity + 1
                        )
                      }
                    >
                      <Plus size={15} />
                    </button>

                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeFromCart(item.key)
                    }
                  >
                    <Trash2 size={15} />
                    REMOVE
                  </button>

                </div>

              </div>

            </article>
          );
        })}

      </div>

      {/* SUMMARY */}
      <aside className="cart-summary">

        <h2>PRICE DETAILS</h2>

        <div>
          <span>
            Total MRP
          </span>

          <span>
            ₹
            {cart
              .reduce(
                (sum, item) =>
                  sum +
                  item.product.mrp *
                    item.quantity,
                0
              )
              .toLocaleString("en-IN")}
          </span>
        </div>

        <div>
          <span>
            Discount
          </span>

          <span className="green">
            - ₹
            {(
              cart.reduce(
                (sum, item) =>
                  sum +
                  item.product.mrp *
                    item.quantity,
                0
              ) - subtotal
            ).toLocaleString("en-IN")}
          </span>
        </div>

        <div>
          <span>
            Delivery Fee
          </span>

          <span>
            {shippingFee === 0
              ? "FREE"
              : `₹${shippingFee}`}
          </span>
        </div>

        <hr />

        <div className="total-row">

          <strong>
            Total Amount
          </strong>

          <strong>
            ₹{total.toLocaleString("en-IN")}
          </strong>

        </div>

        <button
          className="checkout-button"
          onClick={() =>
            navigate("/login")
          }
        >
          PLACE ORDER
          <ArrowRight size={18} />
        </button>

        <div className="secure-checkout">
          <ShieldCheck size={17} />
          <span>
            Safe and secure checkout
          </span>
        </div>

      </aside>

    </section>
  );
}