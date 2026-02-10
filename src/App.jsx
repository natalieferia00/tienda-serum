import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';


import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Modal from './components/Modal';
import ShoppingCart from './components/ShoppingCart';
import Wishlist from './components/Wishlist';
import SearchBar from "./components/SearchBar";


const defaultProducts = [
  { id: 1, name: 'Sérum', image: 'serum.jpg', price: 29.99, category: 'Sérum' },
  { id: 2, name: 'Crema Hidratante', image: 'crema.jpg', price: 19.50, category: 'Cremas' },
  { id: 3, name: 'Tónico', image: 'tonico.jpg', price: 25.00, category: 'Sérum' },
  { id: 4, name: 'Limpiador Facial', image: 'limpiador.jpg', price: 15.75, category: 'Limpiadores' },
  { id: 5, name: 'Aceite Facial', image: 'aceite.jpg', price: 35.00, category: 'Aceites' },
  { id: 6, name: 'Mascarilla', image: 'mascarilla.jpg', price: 12.00, category: 'Cremas' },
];

const App = () => {
  const [productsData, setProductsData] = useState(defaultProducts); // Iniciamos con los predeterminados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  useEffect(() => {
    const syncStock = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const dbProducts = response.data;


        const synced = defaultProducts.map(localProd => {
          const dbMatch = dbProducts.find(dbProd => dbProd.name === localProd.name);
          return dbMatch ? { ...localProd, _id: dbMatch._id, stock: dbMatch.stock } : localProd;
        });
        
        setProductsData(synced);
      } catch (error) {
        console.warn("Backend no disponible, usando stock local temporal.");
      }
    };
    syncStock();
  }, []);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

 
  const handleAddToCart = async (product) => {
    if (!product._id) {
        showModal("Error: Producto no sincronizado con el inventario real.");
        return;
    }

    try {
      
      await axios.patch(`http://localhost:5000/api/products/${product._id}/stock`, { cantidad: 1 });

      setCartItems((prevCart) => {
        const exists = prevCart.find((item) => item.id === product.id);
        if (exists) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      setIsCartOpen(true);
    } catch (error) {
      showModal(error.response?.data?.error || "No hay suficiente stock en bodega.");
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
    setIsWishlistOpen(true);
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const filteredProducts = selectedCategory === 'Todos'
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="app-container">
      <Header
        showModal={showModal}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
      />

      <Routes>
        <Route path="/" element={
            <>
              <HeroCarousel />
              <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <ProductGrid products={filteredProducts} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} />
              <footer className="footer-button-container">
                <a href="mailto:natalieferia1@gmail.com" className="footer-button">CONTACTANOS</a>
              </footer>
            </>
          }
        />
      </Routes>

      <ShoppingCart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist wishlist={wishlist} handleRemoveFromWishlist={handleRemoveFromWishlist} isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="modal-title">Inventario Serum</h2>
        <p className="modal-text">{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default App;