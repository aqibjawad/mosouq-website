import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import "./responsive.css";
import { GET } from "../../apicontrollers/apiController";

const HomeDeals = () => {
  const [deals, setDeals] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const result = await GET("deal/get-deals");
        
        // Debug: log the result to see what we're getting
        console.log("API Response:", result);
        
        // Handle different possible response structures
        if (Array.isArray(result)) {
          setDeals(result);
        } else if (result && Array.isArray(result.data)) {
          setDeals(result.data);
        } else if (result && Array.isArray(result.deals)) {
          setDeals(result.deals);
        } else {
          console.warn("Unexpected API response structure:", result);
          setDeals([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError(err.message || "Failed to fetch deals");
        setDeals([]); // Ensure deals is still an array
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && Array.isArray(deals) && deals.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % deals.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, deals]);

  const getImageSource = (business) => {
    if (business.images?.[0]) return business.images[0];
    if (business.deal_image) return business.deal_image;
    return "/api/placeholder/400/320";
  };

  const renderMobileCarousel = () => {
    // Additional safety check
    if (!Array.isArray(deals) || deals.length === 0) {
      return <div>No deals available</div>;
    }

    return (
      <div
        style={{ position: "relative", overflow: "hidden", padding: "0 1rem" }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {deals.map((businesses, index) => (
            <div
              key={businesses._id || index}
              style={{
                flex: "0 0 100%",
                width: "100%",
              }}
            >
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
                  <div style={{ position: "relative", textAlign: "right" }}>
                    <img
                      src={getImageSource(businesses)}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        padding: "10px",
                        height: "200px",
                      }}
                      alt={businesses.name || "Deal Image"}
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
                      target="_blank"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Request Consultation
                    </Link>
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: currentSlide === index ? "#404EED" : "#ccc",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h2>Loading deals...</h2>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h2>Error loading deals</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Show empty state
  if (!Array.isArray(deals) || deals.length === 0) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h2>No deals available</h2>
        <p>Check back later for new deals!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "2rem", overflow: "hidden" }}>
      <Row
        className="justify-content-between mt-5"
        style={{
          marginLeft: isMobile ? "1rem" : "3rem",
          marginRight: isMobile ? "1rem" : "0",
        }}
      >
        <Col xs="6" sm="6">
          <h2 style={{ fontSize: isMobile ? "20px" : "24px" }}>Top Deals</h2>
          <p style={{ fontSize: isMobile ? "14px" : "16px" }}>
            Offers you don't want to miss
          </p>
        </Col>
        <Col
          xs="auto"
          sm="auto"
          style={{ marginRight: isMobile ? "1rem" : "4rem" }}
        >
          <Link
            to="/deals"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: isMobile ? "8px 16px" : "10px 20px",
              fontSize: isMobile ? "12px" : "14px",
              color: "white",
              backgroundColor: "#404EED",
              borderRadius: "62px",
              textDecoration: "none",
              textAlign: "center",
              width: isMobile ? "100px" : "135px",
              height: isMobile ? "40px" : "49px",
              border: "1px solid #0000004D",
            }}
          >
            View All
          </Link>
        </Col>
      </Row>

      {isMobile ? (
        renderMobileCarousel()
      ) : (
        <Row
          className="cat-container"
          style={{ marginLeft: "3rem", marginRight: "3rem" }}
        >
          {deals.map((businesses, index) => (
            <Col key={businesses._id || index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link
                to={`/deal-details/${businesses._id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <div style={{ position: "relative", textAlign: "right" }}>
                    <img
                      src={getImageSource(businesses)}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        padding: "10px",
                        height: "200px",
                      }}
                      alt={businesses.name || "Deal Image"}
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
      )}
    </div>
  );
};

export default HomeDeals;