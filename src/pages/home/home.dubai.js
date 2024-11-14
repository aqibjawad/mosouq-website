import React, { useState, useEffect } from "react";
import "./index.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET } from "../../apicontrollers/apiController";
import Marquee from "react-fast-marquee";

const ExploreDubai = () => {
  const [dubai, setDubai] = useState([]);

  const fetchData = async () => {
    GET("dubai/get-dubai").then((result) => {
      setDubai(result);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="carousel-container">
        <Container fluid className=" px-md-5 px-3">
        <Row className="justify-content-between mt-5">
          <Col sm="6">
            <h2>Explore Dubai</h2>
            <p>Hear what our users have to say about us</p>
          </Col>

          <Col sm="auto">
            <Link to="/" className="business-button-header">
              View All
            </Link>
          </Col>
        </Row>
        </Container>

      <Container fluid className="p-0 ml-5">
       
        <div>
        <Marquee className="mt-5 ml-5" >
          {/* <div className="image-row"> */}
            {dubai.map((dubaii, index) => (
              <div key={index} className="image-container">
                <img
                  src={dubaii.dubai_image}
                  alt={`Background ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "550px",
                    borderRadius: "12px",
                  }}
                />
                <div className="overlay">
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    {dubaii.name}
                  </div>
                  <div style={{ fontWeight: "500", fontSize: "16px" }}>
                    {dubaii.description}
                  </div>
                </div>
              </div>
            ))}
          {/* </div> */}
          </Marquee>
        </div>
      </Container>
    </div>
  );
};

export default ExploreDubai;
