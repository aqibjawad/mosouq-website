import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import "./responsive.css";
import { GET } from "../../apicontrollers/apiController";

// Utility function to calculate the distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

const HomeDeals = () => {
  const [deals, setDeals] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);

  useEffect(() => {
    // Get deals from API
    GET("deal/get-deals").then((result) => {
      setDeals(result);
    });
  }, []);

  return (
    <div style={{ marginTop: "7rem", overflow: "hidden" }}>
      <Row
        className="justify-content-between mt-5"
        style={{ marginLeft: "3rem" }}
      >
        <Col sm="6" className="">
          <h2>Top Deals</h2>
          <p>Offers you don't want to miss</p>
        </Col>

        <Col sm="auto" style={{ marginRight: "4rem" }}>
          <Link
            to="/deals"
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

      <div>
        <Row
          className="mt-4 cat-container"
          style={{ marginLeft: "3rem", marginRight: "3rem" }}
        >
          {deals.map((businesses, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                to={`/deal-details/${businesses._id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
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
                      src={
                        businesses.images && businesses.images[0]
                          ? businesses.images[0]
                          : businesses.deal_image
                      }
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        padding: "10px",
                        height: "200px",
                      }}
                      alt="Banner"
                    />
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
                    }}
                  >
                    {businesses.name}
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
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeDeals;
