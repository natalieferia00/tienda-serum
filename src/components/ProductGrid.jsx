import React from 'react';
import { ShoppingCart, Heart, Filter } from 'lucide-react';
import './ProductGrid.css';

const IconButton = ({ icon: Icon, onClick }) => (
  <button onClick={onClick} className="icon-button">
    <Icon size={20} />
  </button>
);

const ProductGrid = ({ products, showModal }) => {
  return (
    <main className="product-grid">
      {/* 🔹 Encabezado */}
      <h1 className="grid-title">Productos</h1>

      {/* 🔹 Botón filtro */}
      <div className="grid-actions-header">
        <button
          onClick={() => showModal('Filtrar productos')}
          className="filter-button"
        >
          <Filter size={16} />
          Filtrar
        </button>
      </div>

      {/* 🔹 Grilla de productos */}
      <div className="grid-container">
        {products.map((product) => (
          <div key={product.id} className="grid-item">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="grid-actions">
              <IconButton
                icon={Heart}
                onClick={() =>
                  showModal(`Añadir ${product.name} a favoritos`)
                }
              />
              <IconButton
                icon={ShoppingCart}
                onClick={() =>
                  showModal(`Añadir ${product.name} al carrito`)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductGrid;
