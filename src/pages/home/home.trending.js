import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { GET } from "../../apicontrollers/apiController";

const HomeTrending = () => {
  const [business, setBusiness] = useState([]);
  console.log(business);

  // useEffect(() => {
  //   GET("business-profile/getAll").then((result) => {
  //     setBusiness(result.businessProfiles); // Assuming your API response has the structure provided
  //   });
  // }, []);

  return (
    <div className="" style={{ marginTop: "7rem", overflow: "hidden" }}>
      <Container fluid className="trend-cont  px-3 px-md-5">
        <Row className="justify-content-between mt-5 ">
          <Col sm="6" className="">
            <h2>Trending Businesses</h2>
            <p>Busines that people vists the most</p>
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
                color: "white",
                backgroundColor: "#404EED",
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
      </Container>

      {/* <Container fluid className=" px-3 px-md-5">
        <Row className="justify-content-center mt-4 cat-container">
          {business.slice(0, 4).map((businesses, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/business-details/${businesses._id}`}
              >
                <div className=" shadow-sm rounded-2 p-2 business_card">
                  <div>
                    <img
                      src={
                        businesses.logo
                          ? businesses.logo
                          : "https://placehold.co/700x600"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/700x600";
                      }}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        borderRadius: "6px",
                        height: "180px",
                      }}
                      alt="Banner"
                    />
                  </div>

                  <div className=" cat-container-content">
                    <div>
                      <div className=" d-flex align-items-center py-1   justify-content-between">
                        <div className="sub_heading">{businesses.name}</div>
                        <div className=" rating_item d-flex   align-items-center px-2 rounded-1">
                          <ReactStars
                            count={1}
                            value={1}
                            size={20}
                            edit={false}
                          />
                          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                            4.3 (200+)
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginTop: "10px",
                        }}
                      >
                        {businesses.description
                          ? businesses.description.slice(0, 45) + "..."
                          : ""}
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          color: "#4D4D4D",
                          marginTop: "5px",
                        }}
                        className=" mb-2"
                      >
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            businesses.location
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Business Location
                        </a>
                      </div>
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
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container> */}
    </div>
  );
};

export default HomeTrending;
