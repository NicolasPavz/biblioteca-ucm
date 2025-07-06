import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch, onClear, disabled = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleSearch();
    }
  };

  return (
    <div className="search-section">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar libros por tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="search-input"
        />
        <div className="search-buttons">
          <button 
            onClick={handleSearch} 
            disabled={disabled || !searchTerm.trim()}
            className="search-button"
          >
            Buscar por tipo
          </button>
          <button 
            onClick={handleClear} 
            disabled={disabled}
            className="clear-button"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;