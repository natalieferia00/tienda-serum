import React from 'react';
import './Wishlist.css';

const Wishlist = ({ wishlist, handleRemoveFromWishlist, isOpen, onClose }) => {
  if (!isOpen) return null; // 🚀 evita renderizar si está cerrado

  return (
    <div className="wishlist-overlay">
      <div className="wishlist-modal">
        {/* Header */}
        <div className="wishlist-header">
          <h2>Lista de deseos</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {/* Contenido */}
        {wishlist.length === 0 ? (
          <p className="empty-text">Tu lista de deseos está vacía.</p>
        ) : (
          <ul className="wishlist-list">
            {wishlist.map((item) => (
              <li key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-img" />
                <div className="wishlist-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
