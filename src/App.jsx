import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Importación de tus componentes
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Modal from './components/Modal';
import ShoppingCart from './components/ShoppingCart';
import Wishlist from './components/Wishlist';

// 1. URL de tu Backend en Render
const API_URL = "https://serum-backend.onrender.com/api/products";

// 2. Productos Predeterminados (Estructura base)
const defaultProducts = [
  { id: 1, name: 'Sérum', image: 'serum.jpg', price: 29.99, category: 'Sérum' },
  { id: 2, name: 'Crema Hidratante', image: 'crema.jpg', price: 19.50, category: 'Cremas' },
  { id: 3, name: 'Tónico', image: 'tonico.jpg', price: 25.00, category: 'Sérum' },
  { id: 4, name: 'Limpiador Facial', image: 'limpiador.jpg', price: 15.75, category: 'Limpiadores' },
  { id: 5, name: 'Aceite Facial', image: 'aceite.jpg', price: 35.00, category: 'Aceites' },
  { id: 6, name: 'Mascarilla', image: 'mascarilla.jpg', price: 12.00, category: 'Cremas' },
];

const App = () => {
  const [productsData, setProductsData] = useState(defaultProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // 🔄 EFECTO DE SINCRONIZACIÓN: Conecta datos locales con IDs y Stock del Backend
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const response = await axios.get(API_URL);
        const dbProducts = response.data;

        // Mapeamos los productos locales para inyectarles el _id y stock real de MongoDB
        const synced = defaultProducts.map(localProd => {
          const dbMatch = dbProducts.find(dbProd => dbProd.name === localProd.name);
          return dbMatch 
            ? { ...localProd, _id: dbMatch._id, stock: dbMatch.stock } 
            : localProd;
        });
        
        setProductsData(synced);
        console.log("✅ Sincronización exitosa con Render y MongoDB Atlas.");
      } catch (error) {
        console.error("❌ Error conectando al backend:", error);
      }
    };
    syncWithBackend();
  }, []);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // 🛒 LÓGICA DE CARRITO CON DESCUENTO DE STOCK REAL
  const handleAddToCart = async (product) => {
    // Si el producto no se ha sincronizado con el backend, no permitimos la compra
    if (!product._id) {
        showModal("Error: El producto no se ha sincronizado con el inventario real de la nube.");
        return;
    }

    try {
      // Intentamos descontar 1 unidad en la base de datos de MongoDB Atlas
      await axios.patch(`${API_URL}/${product._id}/stock`, { cantidad: 1 });

      // Si el backend responde OK, actualizamos el estado del carrito
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
      // Manejo de errores (ej: Stock insuficiente)
      const errorMsg = error.response?.data?.error || "Error de conexión con el servidor.";
      showModal(errorMsg);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) return prevWishlist;
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
      />

      <Routes>
        <Route path="/" element={
            <>
              <HeroCarousel />
              <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <ProductGrid 
                products={filteredProducts} 
                handleAddToCart={handleAddToCart} 
                handleAddToWishlist={handleAddToWishlist} 
              />
              <footer className="footer-button-container">
                <a href="mailto:natalieferia1@gmail.com" className="footer-button">CONTACTANOS</a>
              </footer>
            </>
          }
        />
      </Routes>

      {/* Widgets de Carrito y Wishlist */}
      <ShoppingCart 
        cartItems={cartItems} 
        handleRemoveFromCart={handleRemoveFromCart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      <Wishlist 
        wishlist={wishlist} 
        handleRemoveFromWishlist={handleRemoveFromWishlist} 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />

      {/* Modal de Alertas de Inventario */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="modal-title">Inventario Serum</h2>
        <p className="modal-text">{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default App;