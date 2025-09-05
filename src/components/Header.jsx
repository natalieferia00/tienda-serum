import React from 'react';
import { ShoppingCart, Heart, Search, ChevronLeft } from 'lucide-react';

const IconButton = ({ icon: Icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`icon-button ${className}`}
  >
    <Icon size={20} />
  </button>
);

const Header = ({ showModal }) => {
  return (
    <header className="main-header">
      <IconButton icon={ChevronLeft} onClick={() => showModal('Navegar hacia atrás')} />
      <div className="header-nav">
        <IconButton icon={Search} onClick={() => showModal('Abrir barra de búsqueda')} />
        <IconButton icon={Heart} onClick={() => showModal('Abrir lista de deseos')} />
        <IconButton icon={ShoppingCart} onClick={() => showModal('Ver carrito de compras')} />
      </div>
    </header>
  );
};

export default Header;
