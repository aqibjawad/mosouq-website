import React from "react";
import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";
import { FaFacebookMessenger, FaSearch, FaThumbsUp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const FacebookStyleHeader = ({ businessData }) => {
  return (
    <div className="position-relative">
      {/* Cover Photo Section */}
      <div className="position-relative" style={{ height: "350px" }}>
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
                  width: "168px",
                  height: "168px",
                  borderRadius: "50%",
                  border: "4px solid white",
                  backgroundColor: "white",
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
            <div className="d-flex gap-2">
              <Button variant="primary" className="d-flex align-items-center">
                <FaFacebookMessenger className="me-2" />
                Message
              </Button>
              <Button variant="light" className="d-flex align-items-center">
                <FaPhone className="me-2" />
                Call
              </Button>
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
              >
                <MdEmail className="me-2" />
                Email
              </Button>
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
              >
                <MdEmail className="me-2" />
                Whatsapp
              </Button>
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
              >
                <MdEmail className="me-2" />
                Website
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FacebookStyleHeader;
