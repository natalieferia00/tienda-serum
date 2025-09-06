import React from 'react';
import { ShoppingCart, Heart, Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IconButton = ({ icon: Icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`icon-button ${className}`}
  >
    <Icon size={20} />
  </button>
);

const Header = ({ openCart, openWishlist }) => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      {/* 🔙 Botón atrás */}
      

      <div className="header-nav">
        <IconButton icon={Search} onClick={() => console.log('Buscar...')} />
        {/* ❤️ Ahora abre wishlist */}
        <IconButton icon={Heart} onClick={openWishlist} />
        {/* 🛒 Ahora abre carrito */}
        <IconButton icon={ShoppingCart} onClick={openCart} />

      </div>
    </header>
  );
};

export default Header;
