import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";

import { GET } from "../../apicontrollers/apiController";

import SearchBar from "../../components/searchbar";

import { Link } from "react-router-dom";

import "./index.css";
import { MdArrowDropDown } from "react-icons/md";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState();

  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    GET("category/get-categories").then((result) => {
      setCategories(result);
    });

    GET("subcategory/get-subcategories").then((result) => {
      setSubCategories(result);
    });
  }, []);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div>
      <div className=" py-5 text-center mt-5">
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
        className="  px-3 mb-5 px-md-5"
      >
        <Row className="  mx-auto">
          <Col lg={9} className=" mx-auto">
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
                  className="custom-div px-3 border-0  justify-content-between d-flex align-items-center p-2"
                  onClick={() => toggleExpand(index)}
                >
                  <Link
                    to={`/business/${category.name}/${category._id}`}
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
                            to={`/business/${subcategory.sub_name}/${subcategory._id}`}
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