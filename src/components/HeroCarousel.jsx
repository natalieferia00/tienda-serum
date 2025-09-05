import React from "react";
import "./HeroCarousel.css";

const HeroCarousel = () => {
  return (
    <section className="hero-carousel">
      <div className="carousel-track">
        <img
          src="fondo1.jpg"
          alt="Promoción 1"
        />
        <img
          src="fondo2.jpg"
          alt="Promoción 2"
        />
        <img
          src="fondo4.jpg"
          alt="Promoción 3"
        />
      </div>

      <div className="carousel-indicators">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default HeroCarousel;
