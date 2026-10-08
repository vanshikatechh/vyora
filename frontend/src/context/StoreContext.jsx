import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("vyora_cart") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("vyora_wishlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "vyora_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "vyora_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToCart = (product, options = {}) => {

    const key =
      `${product._id}-${options.size || ""}-${options.color || ""}`;

    setCart((previous) => {

      const existing = previous.find(
        (item) => item.key === key
      );

      if (existing) {
        return previous.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          key,
          product,
          size: options.size || "",
          color: options.color || "",
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (key, quantity) => {

    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (key) => {
    setCart((previous) =>
      previous.filter(
        (item) => item.key !== key
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {

    setWishlist((previous) => {

      if (previous.includes(productId)) {
        return previous.filter(
          (id) => id !== productId
        );
      }

      return [...previous, productId];
    });
  };

  const isInWishlist = (productId) =>
    wishlist.includes(productId);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.product.price) *
        item.quantity,
    0
  );

  const shippingFee =
    subtotal === 0
      ? 0
      : subtotal >= 999
      ? 0
      : 79;

  const total = subtotal + shippingFee;

  const value = useMemo(
    () => ({
      cart,
      wishlist,

      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,

      toggleWishlist,
      isInWishlist,

      cartCount,
      subtotal,
      shippingFee,
      total,
    }),
    [
      cart,
      wishlist,
      cartCount,
      subtotal,
      shippingFee,
      total,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}