import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ArrowRight,
} from "lucide-react";

import api from "../lib/apis.jsx";

export default function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const response =
          await api.get("/orders/mine");

        setOrders(
          response.data || []
        );

      } catch (err) {

        setError(
          err.response?.data?.message ||
            "Unable to load orders."
        );

      } finally {
        setLoading(false);
      }
    };

    loadOrders();

  }, []);

  if (loading) {
    return (
      <div className="orders-loading">
        Loading orders...
      </div>
    );
  }

  return (
    <section className="orders-page">

      <div className="orders-heading">

        <div>
          <span>ACCOUNT</span>
          <h1>My Orders</h1>
        </div>

        <Link to="/shop">
          Continue shopping
          <ArrowRight size={16} />
        </Link>

      </div>

      {error && (
        <div className="orders-error">
          {error}
        </div>
      )}

      {!error &&
        orders.length === 0 && (
          <div className="no-orders">

            <Package size={45} />

            <h2>
              No orders yet
            </h2>

            <p>
              Your orders will appear here
              after you make a purchase.
            </p>

            <Link
              to="/shop"
              className="primary-btn"
            >
              START SHOPPING
            </Link>

          </div>
        )}

      <div className="orders-list">

        {orders.map((order) => (

          <article
            className="order-card"
            key={order._id}
          >

            <div className="order-top">

              <div>
                <small>
                  ORDER ID
                </small>

                <strong>
                  #
                  {order._id
                    .slice(-8)
                    .toUpperCase()}
                </strong>
              </div>

              <div>
                <small>
                  ORDER DATE
                </small>

                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <span
                className={`order-status ${order.orderStatus}`}
              >
                {order.orderStatus}
              </span>

            </div>

            <div className="order-products">

              {order.items?.map(
                (item, index) => (
                  <div
                    className="order-product"
                    key={
                      item.product ||
                      index
                    }
                  >

                    <img
                      src={
                        item.image ||
                        "https://placehold.co/100x130?text=VYORA"
                      }
                      alt={item.title}
                    />

                    <div>
                      <strong>
                        {item.brand}
                      </strong>

                      <p>
                        {item.title}
                      </p>

                      <small>
                        Qty:{" "}
                        {item.quantity}
                      </small>

                      {item.size && (
                        <small>
                          Size:{" "}
                          {item.size}
                        </small>
                      )}
                    </div>

                    <b>
                      ₹
                      {Number(
                        item.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </b>

                  </div>
                )
              )}

            </div>

            <div className="order-bottom">

              <span>
                Payment:{" "}
                {order.paymentMethod}
              </span>

              <strong>
                Total: ₹
                {Number(
                  order.total
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}