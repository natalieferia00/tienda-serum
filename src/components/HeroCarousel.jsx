import React from "react";
import "./HeroCarousel.css"; // Assuming your CSS file is named this

const HeroCarousel = () => {
  return (
    <section className="hero-carousel">
      {/* The carousel track now only contains a single image */}
      <div className="carousel-track">
        <img src="fondo1.jpg" alt="Promoción 1" />
      </div>
      {/* Navigation buttons and indicators have been removed */}
    </section>
  );
};

export default HeroCarousel;