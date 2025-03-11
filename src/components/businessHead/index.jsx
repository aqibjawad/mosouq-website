import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Nav } from "react-bootstrap";
import {
  FaFacebookMessenger,
  FaSearch,
  FaThumbsUp,
  FaWhatsapp,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { POST } from "../../apicontrollers/apiController";

const FacebookStyleHeader = ({ businessData }) => {
  const id = localStorage.getItem("selectedBusinessId");

  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

  const handleViewEmail = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const user = JSON.parse(userString);

      // Fallback if userId is not found
      const userId = user.userId || user._id || user.id;

      if (!userId) {
        toast.error("Unable to retrieve user ID.");
        return;
      }

      const statsEmailData = {
        type: "email",
        userId: userId,
        businessId: id,
      };

      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast.success("Email viewed successfully!");
        setShowEmail(true);
      } else {
        toast.error(res.sqlMessage || "Failed to view email.");
      }
    } catch (error) {
      console.error("Error viewing email:", error);
      toast.error("Failed to view email. Please try again.");
    }
  };

  const handleViewPhone = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const user = JSON.parse(userString);

      // Fallback if userId is not found
      const userId = user.userId || user._id || user.id;

      if (!userId) {
        toast.error("Unable to retrieve user ID.");
        return;
      }

      const statsEmailData = {
        type: "phone",
        userId: userId,
        businessId: id,
      };

      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast.success("Number viewed successfully!");
        setShowPhone(true);
      } else {
        toast.error(res.sqlMessage || "Failed to view number.");
      }
    } catch (error) {
      console.error("Error viewing number:", error);
      toast.error("Failed to view number. Please try again.");
    }
  };

  const handleViewWhatsApp = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const user = JSON.parse(userString);

      // Fallback if userId is not found
      const userId = user.userId || user._id || user.id;

      if (!userId) {
        toast.error("Unable to retrieve user ID.");
        return;
      }

      const statsEmailData = {
        type: "whastapp",
        userId: userId,
        businessId: id,
      };

      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast.success("Number viewed successfully!");
        setShowWhatsapp(true);
      } else {
        toast.error(res.sqlMessage || "Failed to view number.");
      }
    } catch (error) {
      console.error("Error viewing number:", error);
      toast.error("Failed to view number. Please try again.");
    }
  };

  const handleVieWebsite = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const user = JSON.parse(userString);

      // Fallback if userId is not found
      const userId = user.userId || user._id || user.id;

      if (!userId) {
        toast.error("Unable to retrieve user ID.");
        return;
      }

      const statsEmailData = {
        type: "website",
        userId: userId,
        businessId: id,
      };

      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast.success("Number viewed successfully!");
        setShowWebsite(true);
      } else {
        toast.error(res.sqlMessage || "Failed to view number.");
      }
    } catch (error) {
      console.error("Error viewing number:", error);
      toast.error("Failed to view number. Please try again.");
    }
  };

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
          <Col item lg={5} className="d-flex align-items-end">
            <div className="position-relative">
              <img
                src={businessData?.logo || "/api/placeholder/168/168"}
                alt="Profile"
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  objectFit: "contain",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              />
            </div>
            <div className="mb-3">
              <h1 className="fs-2 fw-bold text-dark">
                {businessData?.authDetails?.company || "Business Name"}
              </h1>
              <p className="text-secondary">
                {businessData?.followers || 0} Reviews •{" "}
              </p>
            </div>
          </Col>

          {/* Action Buttons */}
          <Col lg={7} className="" style={{ marginBottom: "4rem" }}>
            <div className="row g-2">
              <div className="col-6 col-md-2">
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center w-100"
                >
                  <FaFacebookMessenger className="me-2" />
                  Message
                </Button>
              </div>

              <div className="col-6 col-md-2">
                <Button
                  variant="light"
                  className="d-flex align-items-center justify-content-center w-100"
                  onClick={handleViewPhone}
                >
                  <FaPhone className="me-2" />
                  {showPhone
                    ? businessData?.authDetails?.phone ||
                      businessData?.phone ||
                      "Call"
                    : "Call"}
                </Button>
              </div>
              <div className="col-6 col-md-2">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center justify-content-center w-100"
                  onClick={handleViewEmail}
                >
                  <MdEmail className="me-2" />
                  {showEmail
                    ? businessData?.authDetails?.email ||
                      businessData?.email ||
                      "Email"
                    : "Email"}
                </Button>
              </div>

              <div className="col-6 col-md-2">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center justify-content-center w-100"
                  as="a"
                  href={`https://wa.me/${
                    businessData?.authDetails?.phone?.replace(/[^\d]/g, "") ||
                    businessData?.phone?.replace(/[^\d]/g, "") ||
                    ""
                  }`}
                  onClick={handleViewWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="me-2" />
                  {showWhatsapp
                    ? businessData?.authDetails?.phone ||
                      businessData?.phone ||
                      "Call"
                    : "Call"}
                </Button>
              </div>
              <div className="col-6 col-md-2">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center justify-content-center w-100"
                  as="a"
                  href={
                    businessData.website || businessData?.authDetails?.website
                  }
                  target="_blank"
                  onClick={handleVieWebsite}
                >
                  <MdEmail className="me-2" />
                  {showWebsite
                    ? businessData.website ||
                      businessData?.authDetails?.website ||
                      "Website"
                    : "Website"}
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
