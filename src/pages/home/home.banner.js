import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SearchBar from "../../components/searchbar";

import "./index.css";

const HomeBanner = () => {
  return (
    <div
      id="home-banner"
      className=" py-4 d-flex justify-content-between align-items-center  pt-5"
    >
      <Container fluid className="  px-md-5    pt-5  px-3">
        <Row className=" align-items-center ">
          <Col lg={5} md={12} sm={12} className=" align-items-center mb-lg-0">
            <h1 className="banner-text pt-4">
              Your <span style={{ color: "#404EED" }}>Trusted</span> Company
              Guide.
            </h1>
            <p className="banner-descrp">
              {" "}
              Fine, connect & experience! Your trusted source for exploration.
            </p>

            <Col md={12}>
              <SearchBar />
            </Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                color: "#9199A3",
                gap: "5px",
              }}
            >
              <p className=" m-0" style={{ fontWeight: "400" }}>
                Suggestion:
              </p>
              <p style={{ margin: 0, color: "#000" }}>
                Designer, Programing,{" "}
                <span style={{ color: "#0A65CC" }}>Digital Marketing,</span>
                Video, Animation.
              </p>
            </div>
          </Col>

          <Col lg={7} md={12} sm={12} className="d-flex justify-content-center">
            <Row className=" mx-auto">
              <Col lg={9} className=" mx-auto">
                <img
                  src="/banner4.png"
                  alt="Outer"
                  className=" w-100 mt-3 logo_first"
                />
                <img
                  src="/banner4.png"
                  alt="Outer"
                  className=" w-100 mt-3 logo_second mt-lg-5"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeBanner;
