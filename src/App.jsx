import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Importa el archivo CSS general
import './App.css';

// Importa los componentes divididos
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Modal from './components/Modal';

// Datos de ejemplo para la aplicación
const products = [
  { id: 1, name: 'Sérum', image: 'serum.jpg', price: 29.99 },
  { id: 2, name: 'Crema Hidratante', image: 'crema.jpg', price: 19.50 },
  { id: 3, name: 'Tónico', image: 'tonico.jpg', price: 25.00 },
  { id: 4, name: 'Limpiador Facial', image: 'limpiador.jpg', price: 15.75 },
  { id: 5, name: 'Aceite Facial', image: 'aceite.jpg', price: 35.00 },
  { id: 6, name: 'Mascarilla', image: 'mascarilla.jpg', price: 12.00 },   { id: 6, name: 'Mascarilla', image: 'mascarilla.jpg', price: 12.00 },
];

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Header showModal={showModal} />
      <HeroCarousel />
      <Categories />
      <ProductGrid products={products} showModal={showModal} />
      
      <footer className="footer-button-container">
        <button className="footer-button">
          Visitar sitio
        </button>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="modal-title">Mensaje</h2>
        <p className="modal-text">{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default App;
