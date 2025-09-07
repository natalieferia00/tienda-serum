import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, handleRemoveFromCart, isOpen, onClose }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null; // 👈 se renderiza solo si está abierto

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">El carrito está vacío.</p>
        ) : (
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-button"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-summary">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="checkout-button">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
