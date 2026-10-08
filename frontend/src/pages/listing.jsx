import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
} from "lucide-react";

import api from "../lib/apis.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Listing() {

  const [searchParams, setSearchParams] =
    useSearchParams();

    const q = searchParams.get("q") || "";

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [total, setTotal] =
    useState(0);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [error, setError] =
    useState("");

  const query = searchParams.get("q") || "";
  const gender = searchParams.get("gender") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "-createdAt";

  useEffect(() => {

    const loadProducts = async () => {

      setLoading(true);
      setError("");

      try {

        const response =
          await api.get("/products", {
            params: {
              search: q,
              gender,
              category,
              minPrice,
              maxPrice,
              sort,
              page: 1,
              limit: 40,
            },
          });

              console.log("VYORA API RESPONSE:", response);
console.log("VYORA PRODUCTS:", response.data?.products);

        setProducts(
          response.data.products  || []
        );

        setTotal(
          response.data.pagination?.total || 0
        );

      } catch (err) {

        
  console.error("VYORA PRODUCT LOAD ERROR:", err);
  console.error("ERROR MESSAGE:", err.message);
  console.error("ERROR CODE:", err.code);
  console.error("ERROR RESPONSE:", err.response?.data);
        setError(
          "Unable to load products. Make sure the backend is running."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProducts();

  }, [
    query,
    gender,
    category,
    minPrice,
    maxPrice,
    sort,
  ]);

  const updateFilter = (
    key,
    value
  ) => {

    const next =
      new URLSearchParams(searchParams);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <section className="listing-page">

      {/* TOP */}
      <div className="listing-top">

        <div>
          <p className="listing-breadcrumb">
            HOME / SHOP
          </p>

          <h1>
            {query
              ? `Search results for "${query}"`
              : category
              ? category
              : gender
              ? `${gender}'s fashion`
              : "All Products"}
          </h1>

          <span>
            {total} items
          </span>
        </div>

        <div className="listing-controls">

          <button
            className="mobile-filter-button"
            onClick={() =>
              setFilterOpen(true)
            }
          >
            <SlidersHorizontal size={17} />
            FILTER
          </button>

          <select
            value={sort}
            onChange={(e) =>
              updateFilter(
                "sort",
                e.target.value
              )
            }
          >
            <option value="-createdAt">
              Recommended
            </option>

            <option value="price">
              Price: Low to High
            </option>

            <option value="-price">
              Price: High to Low
            </option>

            <option value="-rating">
              Customer Rating
            </option>
          </select>

        </div>
      </div>

      <div className="listing-layout">

        {/* FILTERS */}
        <aside
          className={`filter-sidebar ${
            filterOpen
              ? "filter-open"
              : ""
          }`}
        >

          <div className="filter-header">
            <h3>FILTERS</h3>

            <button
              onClick={() =>
                setFilterOpen(false)
              }
            >
              <X size={20} />
            </button>
          </div>

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            CLEAR ALL
          </button>

          <div className="filter-group">
            <h4>Gender</h4>

            {["women", "men", "kids"].map(
              (item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === item}
                    onChange={() =>
                      updateFilter(
                        "gender",
                        item
                      )
                    }
                  />

                  {item.toUpperCase()}
                </label>
              )
            )}
          </div>

          <div className="filter-group">
            <h4>Category</h4>

            {[
              "shirts",
              "dresses",
              "jeans",
              "footwear",
              "beauty",
              "accessories",
            ].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="category"
                  checked={
                    category === item
                  }
                  onChange={() =>
                    updateFilter(
                      "category",
                      item
                    )
                  }
                />

                {item.toUpperCase()}
              </label>
            ))}
          </div>

          <div className="filter-group">

            <h4>Price</h4>

            <input
              type="number"
              placeholder="Minimum"
              value={minPrice}
              onChange={(e) =>
                updateFilter(
                  "minPrice",
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Maximum"
              value={maxPrice}
              onChange={(e) =>
                updateFilter(
                  "maxPrice",
                  e.target.value
                )
              }
            />

          </div>

        </aside>

        {/* PRODUCTS */}
        <div className="listing-products">

          {loading && (
            <div className="loading-state">
              Loading products...
            </div>
          )}

          {!loading && error && (
            <div className="error-state">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="empty-products">
                <h2>
                  No products found
                </h2>

                <p>
                  Try changing your filters
                  or search.
                </p>

                <button
                  onClick={clearFilters}
                >
                  CLEAR FILTERS
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            products.length > 0 && (
              <div className="product-grid">
                {products.map(
                  (product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  )
                )}
              </div>
            )}

        </div>

      </div>
    </section>
  );
}