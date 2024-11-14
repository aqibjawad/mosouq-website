import React from "react";

import {Link} from "react-router-dom"

import {Row, Col, Button} from "react-bootstrap"

import "./index.css";

 
const Categories = () => {
  return (
    <div>

        <div className="cat-Head">
            Near San Francisco, California
        </div>

        <div className="cat-descrp">
         Top 10 Contractors 
        </div>
      <Row
        className="cat-container"
        style={{ marginLeft: "3rem", marginRight: "3rem", marginTop:"7rem" }}
      >
        {[1,2,3].map((businesses, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                height: "400px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  textAlign: "right",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/Rectangle 103.png"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    padding: "10px",
                    height: "auto",
                  }}
                  alt="Banner"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#B9DCFF99",
                    padding: "5px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "12px", marginLeft: "5px" }}>
                    4.3 (200+)
                  </div>
                </div>
                <div
                  style={{
                    color: "#404EED",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {businesses.name}
                </div>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                test descrp
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#4D4D4D",
                  marginTop: "5px",
                }}
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    businesses.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4D4D4D", textDecoration: "none" }}
                >
                  test
                </a>
              </div>

              <Button
                style={{ width: "100%", marginTop: "10px" }}
                variant="primary"
              >
                <Link
                  to={businesses.consultation}
                  target="_black"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Request Consultation
                </Link>
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
