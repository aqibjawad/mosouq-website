import React, { useState, useEffect } from "react";

import { Row, Col, Card, Button } from "react-bootstrap";
import ReactStars from "react-stars";

import { GET } from "../../apicontrollers/apiController";

import { Link } from "react-router-dom";

const DealCards = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    GET("deal/get-deals").then((result) => {
      setDeals(result);
    });
  }, []);

  return (
    <div>
      <Row className="mt-4 cat-container">
        <Row className="mt-4 cat-container">
          {deals.map((businesses, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                to={`/deal-details/${businesses._id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      textAlign: "right",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "5px",
                      minHeight: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {(businesses.images && businesses.images[0]) ||
                    businesses.deal_image ? (
                      <img
                        src={businesses.images?.[0] || businesses.deal_image}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          padding: "10px",
                          height: "200px",
                        }}
                        alt="Deal"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                          fontSize: "14px",
                        }}
                      >
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      <ReactStars count={1} value={1} size={20} edit={false} />
                      <div style={{ fontSize: "12px", marginLeft: "5px" }}>
                        4.3 (200+)
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      color: "black",
                      fontSize: "16px",
                      marginLeft: "10px",
                      marginTop: "10px",
                      flex: "1",
                    }}
                  >
                    {businesses.name}
                  </div>

                  <Button style={{ width: "100%" }} variant="primary">
                    <Link
                      to={businesses.consultation}
                      target="_blank"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Request Consultation
                    </Link>
                  </Button>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default DealCards;
