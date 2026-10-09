"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import Image from "next/image";
type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(false);

  const handleAddClick = () => {
    setShowQuantity(true);
  };

  const handleConfirmAddToCart = () => {
    addToCart(product, quantity);

    setShowQuantity(false);
    setMessage(true);
    setQuantity(1);

    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
        />
      </div>

      {/* Product Information */}
      <h3>{product.title}</h3>

      <p>₹{product.price}</p>

      {/* Add to Cart */}
      {!showQuantity && (
        <button onClick={handleAddClick}>
          Add to Cart
        </button>
      )}

      {/* Quantity Selection */}
      {showQuantity && (
        <div className="quantity-section">

          <h4>How many items?</h4>

          <div className="quantity-controls">

            <button
              onClick={() =>
                setQuantity((prev) =>
                  Math.max(1, prev - 1)
                )
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
            >
              +
            </button>

          </div>

          <button
            className="add-btn"
            onClick={handleConfirmAddToCart}
          >
            Add to Cart
          </button>

        </div>
      )}

      {/* Success Message */}
      {message && (
        <p className="success-message">
          ✅ Item added to cart successfully!
        </p>
      )}

    </div>
  );
}