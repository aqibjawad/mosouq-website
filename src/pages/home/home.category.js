import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET } from "../../apicontrollers/apiController";
import "./responsive.css";

import "./home.pagination.css";

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    GET("category/get-categories").then((result) => {
      setCategories(result);
    });
  }, []);

  const itemsPerPage = 12; // Change to 12 items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{
        // marginTop: "7rem",
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
        minHeight: "540px",
       
      }}
    >

      <Container fluid className=" px-3 px-md-5">
      <Row
        className="justify-content-between mt-4"
       
      >
        <Col sm="6">
          <h2 className=" m-0 text-black">Categories</h2>
          <p className=" text-black ">Trusted Companies with user Reviews</p>
        </Col>
        <Col sm="auto">
          <Link
            to="/categories"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
              fontSize: "14px",
              color: "#656565",
              backgroundColor: "#FAFAFA",
              borderRadius: "62px",
              textDecoration: "none",
              textAlign: "center",
              width: "135px",
              height: "49px",
              border: "1px solid #0000004D",
            }}
          > 
            View All
          </Link>
        </Col>
      </Row>
      <Row
        className="justify-content-center mt-4 cat-container"
        
      >
        {selectedCategories.map((category, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link  to={`/business/${category.name}/${category.id}`} style={{textDecoration:'none', color:'black'}}>
              <div className="custom-div bg-white d-flex align-items-center p-2">
                <div className="me-3">
                  <img
                    src={category.category_image}
                    alt={category.name}
                    className="custom-img"
                  />
                </div>
                <div className="custom-text">{category.name}</div>
              </div>
            </Link> 
          </Col>
        ))}
      </Row>

      </Container>
      
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
