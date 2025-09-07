import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Asegúrate de que este archivo CSS existe y está vinculado correctamente

const IconButton = ({ icon: Icon, onClick, className = '' }) => (
  <button onClick={onClick} className={`icon-button ${className}`}>
    <Icon size={20} />
  </button>
);

const Header = ({ openCart, openWishlist }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setIsSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="main-header">
      <div className="header-nav left-nav">
        {/* Aquí puedes agregar un logo o nombre de la tienda */}
        <h1 className="logo">TIENDA</h1>
      </div>

      <div className="header-nav right-nav">
        <IconButton icon={Search} onClick={toggleSearch} />
        <IconButton icon={Heart} onClick={openWishlist} />
        <IconButton icon={ShoppingCart} onClick={openCart} />
      </div>

      {isSearchOpen && (
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="BUSCAR PRODUCTOS"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton icon={X} onClick={toggleSearch} className="close-search-btn" />
        </form>
      )}
    </header>
  );
};

export default Header;