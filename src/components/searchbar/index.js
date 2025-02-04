import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./index.css";
import { GET } from "../../apicontrollers/apiController";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({
    businessProfiles: [],
    categories: [],
    subCategories: [],
  });

  useEffect(() => {
    // Only make API call if search has content
    if (search.trim()) {
      GET(`business-profile/searchAll?query=${search}`).then((result) => {
        setResults(result);
      });
    } else {
      // Automatically clear results when search is empty
      setResults({
        businessProfiles: [],
        categories: [],
        subCategories: [],
      });
    }
  }, [search]); // Effect runs whenever search changes

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
            {results.businessProfiles.map((profile) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/business/${profile.businessName}/${profile._id}`}
              >
                <Card
                  style={{ marginLeft: "1rem" }}
                  key={profile._id}
                  className="result-card mb-3"
                >
                  <Row noGutters>
                    <Col md={3}>
                      <Card.Img
                        variant="left"
                        src={profile.logo || "default-image-url.jpg"}
                        alt={profile.name}
                        className="custom-img"
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Body>
                        <Card.Title>{profile.businessName}</Card.Title>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Render categories */}
        {results.categories.length > 0 && (
          <div className="section">
            {results.categories.map((category) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/business/${category.name}/${category._id}`}
              >
                <Card
                  style={{ marginLeft: "1rem" }}
                  key={category._id}
                  className="result-card mb-3"
                >
                  <Row noGutters>
                    <Col md={3}>
                      <Card.Img
                        variant="left"
                        src={category.category_image || "default-image-url.jpg"}
                        alt={category.name}
                        className="custom-img"
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Body>
                        <Card.Title>{category.name}</Card.Title>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Render subcategories */}
        {results.subCategories.length > 0 && (
          <div className="section">
            {results.subCategories.map((subCategory) => (
              <Card
                style={{ marginLeft: "1rem" }}
                key={subCategory._id}
                className="result-card mb-3"
              >
                <Row noGutters>
                  <Col md={3}>
                    <Card.Img
                      variant="left"
                      src={
                        subCategory.subcategory_image || "default-image-url.jpg"
                      }
                      alt={subCategory.sub_name}
                      className="custom-img"
                    />
                  </Col>
                  <Col md={9}>
                    <Card.Body>
                      <Card.Title>{subCategory.sub_name}</Card.Title>
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
