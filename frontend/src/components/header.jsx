import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(`/shop?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/shop");
    }

    setMobileOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">

          {/* MOBILE MENU */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* LOGO */}
          <Link to="/" className="brand-logo">
            VYORA
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link to="/shop?category=women">WOMEN</Link>
            <Link to="/shop?category=men">MEN</Link>
            <Link to="/shop?category=kids">KIDS</Link>
            <Link to="/shop?category=footwear">FOOTWEAR</Link>
            <Link to="/shop?category=beauty">BEAUTY</Link>
            <Link to="/shop?category=accessories">ACCESSORIES</Link>
          </nav>

          {/* SEARCH */}
          <form className="header-search" onSubmit={submitSearch}>
            <Search size={19} />

            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* ACTIONS */}
          <div className="header-actions">

            <Link to="/login" className="header-action">
              <UserRound size={20} />
              <span>Profile</span>
            </Link>

            <Link to="/shop" className="header-action wishlist-action">
              <Heart size={20} />

              {wishlist.length > 0 && (
                <b>{wishlist.length}</b>
              )}

              <span>Wishlist</span>
            </Link>

            <Link to="/cart" className="header-action cart-action">
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <b>{cartCount}</b>
              )}

              <span>Bag</span>
            </Link>

          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="mobile-nav">

          <Link
            to="/shop?category=women"
            onClick={() => setMobileOpen(false)}
          >
            WOMEN
          </Link>

          <Link
            to="/shop?category=men"
            onClick={() => setMobileOpen(false)}
          >
            MEN
          </Link>

          <Link
            to="/shop?category=kids"
            onClick={() => setMobileOpen(false)}
          >
            KIDS
          </Link>

          <Link
            to="/shop?category=footwear"
            onClick={() => setMobileOpen(false)}
          >
            FOOTWEAR
          </Link>

          <Link
            to="/shop?category=beauty"
            onClick={() => setMobileOpen(false)}
          >
            BEAUTY
          </Link>

          <Link
            to="/shop?category=accessories"
            onClick={() => setMobileOpen(false)}
          >
            ACCESSORIES
          </Link>

        </div>
      )}
    </>
  );
}