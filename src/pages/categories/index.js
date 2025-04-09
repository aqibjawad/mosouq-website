import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Spinner } from "react-bootstrap";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import SearchBar from "../../components/searchbar";
import { GET } from "../../apicontrollers/apiController";

import "./index.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResult, subcategoriesResult] = await Promise.all([
          GET("category/get-categories"),
          GET("subcategory/get-subcategories"),
        ]);
        setCategories(categoriesResult);
        setSubCategories(subcategoriesResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const createUrlSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[&]/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  if (isLoading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <img src="/mosouq-logo.png" />
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handleCategoryClick = (category) => {
    localStorage.setItem("selectedCategoryId", category._id);
  };

  const handleSubcategoryClick = (subcategory) => {
    localStorage.setItem("selectedSubcategoryId", subcategory._id);
  };

  return (
    <div>
      <div className="py-5 text-center mt-5">
        <div className="pt-4" style={{ fontWeight: "700", fontSize: "62px" }}>
          Categories
        </div>
        <div className="cat-tag-line mb-4">
          Find the best companies in this category!
        </div>
      </div>

      <Container
        style={{ backgroundColor: "#FAFAFA" }}
        fluid
        className="px-3 mb-5 px-md-5"
      >
        <Row className="mx-auto">
          <Col lg={9} className="mx-auto">
            <div className="" style={{ marginTop: "-4.5rem" }}>
              <SearchBar />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5 cat-container">
          {categories.map((category, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="custom-div-container bg-white">
                <div
                  className="custom-div px-3 border-0 justify-content-between d-flex align-items-center p-2"
                  onClick={() => toggleExpand(index)}
                >
                  <Link
                    to={`/categories/${category.name
                      .toLowerCase()
                      .replace(/[&]/g, "and")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`}
                    style={{ color: "black", textDecoration: "none" }}
                    onClick={() => handleCategoryClick(category)}
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

                  <MdArrowDropDown size={20} color="black" />
                </div>

                {expandedIndex === index && (
                  <Card.Body className="subcategories">
                    {subcategories
                      .filter(
                        (subcategory) =>
                          subcategory.category._id === category._id
                      )
                      .map((subcategory, subIndex) => (
                        <div className="sub-cat-container" key={subIndex}>
                          <Link
                            to={`/${createUrlSlug(
                              category.name
                            )}/${createUrlSlug(subcategory.sub_name)}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              marginTop: "1rem",
                              marginLeft: "2rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              className="sub-cat-image"
                              src={subcategory.subcategory_image}
                              alt={subcategory.sub_name}
                            />
                            <div className="sub-cat-name">
                              {subcategory.sub_name}
                            </div>
                          </Link>
                        </div>
                      ))}
                  </Card.Body>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Category;
