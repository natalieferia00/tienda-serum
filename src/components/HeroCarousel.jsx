import React, { useState, useEffect } from "react";
import "./HeroCarousel.css";

const HeroCarousel = () => {
  // 👉 Asegúrate de que las imágenes estén en "public" o en "src/assets"
  const images = ["/fondo1.jpg", "/fondo2.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // 10 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-carousel">
      <div className="carousel-track">
        <img
          src={images[currentIndex]}
          alt={`Promoción ${currentIndex + 1}`}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
