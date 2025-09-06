import React from 'react';
import { Grid, Droplet, Box, FlaskConical, Octagon } from 'lucide-react';
import "./Categories.css";


const categoryIcons = {
  Todos: Grid,
  Sérum: Droplet,
  Cremas: Box,
  Limpiadores: FlaskConical,
  Aceites: Octagon,
};

const categories = [
  { name: 'Todos' },
  { name: 'Sérum' },
  { name: 'Cremas' },
  { name: 'Limpiadores' },
  { name: 'Aceites' },
];

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <section className="categories">
      <div className="categories-list">
        {categories.map((category, index) => {
          const IconComponent = categoryIcons[category.name];
          const isActive = selectedCategory === category.name;
          return (
            <div
              key={index}
              className={`category-item ${isActive ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="category-icon">
                {IconComponent && <IconComponent size={24} />}
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
