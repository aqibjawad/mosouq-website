import React from "react";
import "./index.css";
import { Row, Col, Carousel } from "react-bootstrap";

const BusinessUpdate = () => {
  return (
    <div>
      <div className="business-head">Updates from this business</div>
      <Carousel
        nextIcon={
          <span aria-hidden="true" className="carousel-control-next-icon" />
        }
        prevIcon={
          <span aria-hidden="true" className="carousel-control-prev-icon" />
        }
      >
        <Carousel.Item>
          <div className="card">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <img src="/blog-head.png" alt="Image" className="card-image" />
              </Col>

              <Col lg={9} md={3} sm={12}>
                <div className="card-content">
                  <div className="card-title">Card Title 1</div>
                  <div className="card-text">
                    This is the card description. It contains text that explains
                    the content of the card.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <img src="/blog-head.png" alt="Image" className="card-image" />
              </Col>

              <Col lg={9} md={3} sm={12}>
                <div className="card-content">
                  <div className="card-title">Card Title 2</div>
                  <div className="card-text">
                    This is the card description. It contains text that explains
                    the content of the card.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <img src="/blog-head.png" alt="Image" className="card-image" />
              </Col>

              <Col lg={9} md={3} sm={12}>
                <div className="card-content">
                  <div className="card-title">Card Title 3</div>
                  <div className="card-text">
                    This is the card description. It contains text that explains
                    the content of the card.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BusinessUpdate;
