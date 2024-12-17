import React from "react";
import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";
import { FaFacebookMessenger, FaSearch, FaThumbsUp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import { Link } from "react-router-dom";

const FacebookStyleHeader = ({ businessData }) => {
  return (
    <div className="position-relative">
      {/* Cover Photo Section */}
      <div className="position-relative" style={{ height: "500px" }}>
        <img
          src={businessData?.images?.[0] || "/api/placeholder/1200/350"}
          alt="Cover"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      {/* Profile Section */}
      <Container className="position-relative">
        <Row
          className="align-items-end justify-content-between"
          style={{ marginTop: "-2rem" }}
        >
          {/* Profile Picture & Name */}
          <Col className="d-flex align-items-end">
            <div className="position-relative me-4">
              <img
                src={businessData?.logo || "/api/placeholder/168/168"}
                alt="Profile"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  objectFit:"contain",
                  paddingLeft: "25px",
                  paddingRight: "25px" 
                }}
              />
            </div>
            <div className="mb-3">
              <h1 className="fs-2 fw-bold text-dark">
                {businessData?.businessName || "Business Name"}
              </h1>
              <p className="text-secondary">
                {businessData?.followers || 0} Reviews •{" "}
              </p>
            </div>
          </Col>

          {/* Action Buttons */}
          <Col xs="auto" className="mb-3">
            <div className="row g-2">
              <div className="col-6 col-md-4">
                <Button
                  variant="primary"
                  className="d-flex align-items-center w-100"
                >
                  <FaFacebookMessenger className="me-2" />
                  Message
                </Button>
              </div>
              <div className="col-6 col-md-4">
                <Button
                  variant="light"
                  className="d-flex align-items-center w-100"
                >
                  <FaPhone className="me-2" />
                  Call
                </Button>
              </div>
              <div className="col-6 col-md-4">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center w-100"
                >
                  <MdEmail className="me-2" />
                  Email
                </Button>
              </div>
              <div className="col-6 col-md-4">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center w-100"
                >
                  <MdEmail className="me-2" />
                  Whatsapp
                </Button>
              </div>
              <div className="col-6 col-md-4">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center w-100"
                  as="a"
                  href={businessData.website}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practices
                >
                  <MdEmail className="me-2" />
                  Website
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FacebookStyleHeader;
