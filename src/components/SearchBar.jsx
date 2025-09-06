import React, { useState } from "react";

const SearchBar = ({ products, onSelectProduct }) => {
  const [query, setQuery] = useState("");

  // Filtrar productos en base al texto
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {query && (
        <ul className="search-results">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <li
                key={product.id}
                className="search-item"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-thumb"
                />
                <span>{product.name}</span>
              </li>
            ))
          ) : (
            <li className="search-item empty">No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
