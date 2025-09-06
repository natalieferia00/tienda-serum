import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import './ProductGrid.css';

const IconButton = ({ icon: Icon, onClick }) => (
  <button onClick={onClick} className="icon-button">
    <Icon size={20} />
  </button>
);

const ProductGrid = ({ products, handleAddToCart, handleAddToWishlist }) => {
  return (
    <main className="product-grid">
      <h1 className="grid-title">Productos</h1>
      <div className="grid-container">
        {products.map((product) => (
          <div key={product.id} className="grid-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="grid-actions">
              {/* ❤️ Guardar en lista de deseos */}
              <IconButton
                icon={Heart}
                onClick={() => handleAddToWishlist(product)}
              />
              {/* 🛒 Carrito */}
              <IconButton
                icon={ShoppingCart}
                onClick={() => handleAddToCart(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductGrid;
