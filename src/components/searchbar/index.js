import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Container } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      // Redirect to search results page with query parameter
      navigate(`/search-results?query=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyPress = (e) => {
    // Check if the Enter key was pressed
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container className="search-container">
      <div className="search-bar">
        <FiSearch size={20} className="search-icon" />
        <input
          type="text"
          placeholder="company title, keyword..."
          className="search-input"
          value={search}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </Container>
  );
};

export default SearchBar;
