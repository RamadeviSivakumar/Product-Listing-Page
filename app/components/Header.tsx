
"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { cart } = useCart();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <header className="header">
      <h1>🌟Product Store🌟</h1>

      <div className="cart-container">
        <Link
          href="/cart"
          className="cart-icon"
        >
          🛒 {totalQuantity}
        </Link>

        <div className="cart-preview">
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  className="preview-item"
                  key={item.id}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div>
                    <p>{item.title}</p>

                    <span>
                      ${item.price} × {item.quantity}
                    </span>
                  </div>
                </div>
              ))}

              <hr />

              <strong className="rate">
                Total: ${total.toFixed(2)}
              </strong>

              <br />

              <Link href="/cart" className="view-cart">
                View Cart
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

