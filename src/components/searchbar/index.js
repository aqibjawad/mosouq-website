import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./index.css";
import { GET } from "../../apicontrollers/apiController";

import { Link } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState(""); // State for search input
  const [results, setResults] = useState({
    businessProfiles: [],
    categories: [],
    subCategories: [],
  }); // State for storing API results

  useEffect(() => {
    if (search) {
      GET(`business-profile/searchAll?query=${search}`).then((result) => {
        setResults(result);
      });
    }
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      GET(`business-profile/searchAll?query=${search}`).then((result) => {
        setResults(result);
      });
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
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="results-container">
        {/* Render business profiles */}
        {results.businessProfiles.length > 0 && (
          <div className="section">
            <h2>Business Profiles</h2>
            {results.businessProfiles.map((profile) => (
              <Card key={profile._id} className="result-card mb-3">
                <Row noGutters>
                  <Col md={6}>
                    {/* Placeholder image */}
                    <img
                      variant="left"
                      src={profile.image || "default-image-url.jpg"}
                      alt={profile.name}
                      className="result-image"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Col>
                  <Col md={6}>
                    <Card.Body>
                      <Card.Title>{profile.name}</Card.Title>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}

        {/* Render categories */}
        {results.categories.length > 0 && (
          <div className="section">
            {results.categories.map((category, index) => (
              <div className="" key={category._id}>
                <Row noGutters>
                  <Col key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <div className="card-div-cont">
                      <div className="custom-div-cont px-3 border-0  justify-content-between d-flex align-items-center p-2">
                        <Link
                          to={`/business/${category.name}/${category.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <div className="g-3 d-flex align-items-center">
                            <div className="me-3">
                              <img
                                src={category.category_image}
                                className="custom-img"
                                alt={category.name}
                              />
                            </div>
                            <div className="custom-text">{category.name}</div>
                          </div>
                        </Link>

                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}

        {/* Render subcategories */}
        {results.subCategories.length > 0 && (
          <div className="section">
            <h2>Subcategories</h2>
            {results.subCategories.map((subCategory) => (
              <Card key={subCategory._id} className="result-card mb-3">
                <Row noGutters>
                  <Col md={3}>
                    {/* Placeholder image */}
                    <Card.Img
                      variant="left"
                      src={subCategory.image || "default-image-url.jpg"}
                      alt={subCategory.name}
                      className="result-image"
                    />
                  </Col>
                  <Col md={9}>
                    <Card.Body>
                      <Card.Title>{subCategory.name}</Card.Title>
                      {/* Add more subcategory details here */}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
