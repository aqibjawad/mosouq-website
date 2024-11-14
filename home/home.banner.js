import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchBar from "../src/components/searchbar";
import "./index.css";

const HomeBanner = () => {
  return (
    <div id="home-banner" className="mt-3 mt-md-5">
      <Row>
        <Col lg={5} md={12} sm={12} className="mb-4 mb-lg-0">
          <div className="banner-text">
            Your <span style={{ color: "#404EED" }}>Trusted</span> Company Guide.
          </div>

          <div className="banner-descrp">
            Fine, connect & experience! Your trusted source for exploration.
          </div>

          <Col md={12}>
            <SearchBar />
          </Col>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#9199A3' }}>
            <p style={{ fontWeight: '400', marginRight: '8px', marginTop: "0.5rem" }}>
              Suggestion:
            </p>
            <p style={{ margin: 0, color: '#000' }}>
              Organic Store, Pet Spa, Automotive Garage….
            </p>
          </div>
        </Col>

        <Col lg={7} md={12} sm={12} className="d-flex justify-content-center">
          <img
            src="/banner.jpg"
            alt="Outer"
            className="img-fluid mt-3 mt-lg-5"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomeBanner;
