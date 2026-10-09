
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number
  ) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
