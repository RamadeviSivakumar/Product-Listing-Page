"use client";

import { useCart } from "../components/CartContext";
import Link from "next/link";
export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Shopping Cart</h1>

        <Link href="/products" className="home-icon">
          🏠
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="cart-layout">

          <div className="cart-products">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="cart-item-details">

                  <h3>{item.title}</h3>

                  <p className="cart-price">
                    ${item.price}
                  </p>

                  <div className="cart-quantity">

                    <span>
                      Quantity:
                    </span>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove"
                  >
                    🗑
                  </button>
                </div>

                <div className="item-subtotal">
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </div>

              </div>
            ))}

          </div>

          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>
                {totalItems}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}