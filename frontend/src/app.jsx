import { Routes, Route } from "react-router-dom";

import { StoreProvider } from "./context/StoreContext.jsx";

import Header from "./components/header.jsx";

import Home from "./pages/home.jsx";
import Listing from "./pages/listing.jsx";
import Product from "./pages/product.jsx";
import Cart from "./pages/cart.jsx";
import Login from "./pages/login.jsx";
import Orders from "./pages/orders.jsx";

export default function App() {

  return (
    <StoreProvider>

      <Header />

      <main className="app-main">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Listing />}
          />

          <Route
            path="/product/:id"
            element={<Product />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>

      </main>

      <footer className="site-footer">

        <div className="footer-inner">

          <div>
            <h2>VYORA</h2>
            <p>
              Fashion built around you.
            </p>
          </div>

          <div>
            <h4>SHOP</h4>
            <a href="/shop?gender=women">
              Women
            </a>
            <a href="/shop?gender=men">
              Men
            </a>
            <a href="/shop?gender=kids">
              Kids
            </a>
          </div>

          <div>
            <h4>HELP</h4>
            <a href="/orders">
              Orders
            </a>
            <a href="/login">
              Account
            </a>
            <a href="/shop">
              Returns
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 VYORA. All rights reserved.
        </div>

      </footer>

    </StoreProvider>
  );
}