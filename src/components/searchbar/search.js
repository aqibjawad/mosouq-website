import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { GET } from "../../apicontrollers/apiController";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [results, setResults] = useState({
    businessProfiles: [],
    categories: [],
    subCategories: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      GET(`business-profile/searchAll?query=${searchQuery}`)
        .then((result) => {
          setResults(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  // Reusable card component to maintain consistent styling
  const ResultCard = ({ item, type, linkTo = "" }) => {
    const CardComponent = (
      <Card className="h-100 border shadow-sm" style={{ maxWidth: "100%" }}>
        <div
          style={{
            height: "120px", // Reduced height
            overflow: "hidden",
            borderBottom: "1px solid #eee",
          }}
        >
          <Card.Img
            variant="top"
            src={
              (type === "business" && item.logo) ||
              (type === "category" && item.category_image) ||
              (type === "subcategory" && item.subcategory_image) ||
              "default-image-url.jpg"
            }
            alt={
              (type === "business" && item.businessName) ||
              (type === "category" && item.name) ||
              (type === "subcategory" && item.sub_name) ||
              "Image"
            }
            className="img-fluid"
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
              padding: "8px", // Reduced padding
            }}
          />
        </div>
        <Card.Body className="p-2">
          {" "}
          {/* Reduced padding */}
          <Card.Title className="fs-6 mb-1">
            {(type === "business" && item.businessName) ||
              (type === "category" && item.name) ||
              (type === "subcategory" && item.sub_name)}
          </Card.Title>
          <Badge
            bg={
              type === "business"
                ? "light"
                : type === "category"
                ? "info"
                : "secondary"
            }
            text={type === "business" ? "dark" : "white"}
            className="mt-1 small" // Reduced margin
          >
            {type === "business"
              ? "Business"
              : type === "category"
              ? "Category"
              : "Subcategory"}
          </Badge>
        </Card.Body>
      </Card>
    );

    return linkTo ? (
      <Link to={linkTo} className="text-decoration-none">
        {CardComponent}
      </Link>
    ) : (
      CardComponent
    );
  };

  return (
    <Container fluid className="px-3 py-2">
      {" "}
      {/* Reduced padding */}
      <div className="mb-2">
        {" "}
        {/* Reduced margin */}
        <h2 className="mb-1 fs-4">
          Showing results for:{" "}
          <span className="text-primary">{searchQuery}</span>
        </h2>
      </div>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Searching...</p>
        </div>
      ) : (
        <div className="results-page">
          {/* Business Profiles Section */}
          {results.businessProfiles.length > 0 && (
            <div className="section mb-3">
              {" "}
              {/* Reduced margin */}
              <h3 className="mb-2 pb-2 fs-5 border-bottom">
                {" "}
                {/* Reduced margin */}
                Business Profiles
              </h3>
              <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2">
                {" "}
                {/* Increased columns, reduced gutters */}
                {results.businessProfiles.map((profile) => (
                  <Col key={profile._id}>
                    <ResultCard
                      item={profile}
                      type="business"
                      linkTo={`/business/${profile.businessName}/${profile._id}`}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Categories Section */}
          {results.categories.length > 0 && (
            <div className="section mb-3">
              {" "}
              {/* Reduced margin */}
              <h3 className="mb-2 pb-2 fs-5 border-bottom">
                {" "}
                {/* Reduced margin */}
                Categories
              </h3>
              <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2">
                {" "}
                {/* Increased columns, reduced gutters */}
                {results.categories.map((category) => (
                  <Col key={category._id}>
                    <ResultCard
                      item={category}
                      type="category"
                      linkTo={`/category/${category.name}/${category._id}`}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Subcategories Section */}
          {results.subCategories.length > 0 && (
            <div className="section mb-3">
              {" "}
              {/* Reduced margin */}
              <h3 className="mb-2 pb-2 fs-5 border-bottom">
                {" "}
                {/* Reduced margin */}
                Subcategories
              </h3>
              <Row className="row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2">
                {" "}
                {/* Increased columns, reduced gutters */}
                {results.subCategories.map((subCategory) => (
                  <Col key={subCategory._id}>
                    <ResultCard item={subCategory} type="subcategory" />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* No Results Message */}
          {results.businessProfiles.length === 0 &&
            results.categories.length === 0 &&
            results.subCategories.length === 0 && (
              <div className="text-center py-4">
                <div className="mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-search text-muted"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
                <h4 className="fs-5">No results found</h4>
                <p className="text-muted small">
                  We couldn't find anything matching "{searchQuery}". Try
                  different keywords.
                </p>
              </div>
            )}
        </div>
      )}
    </Container>
  );
};

export default SearchResults;
