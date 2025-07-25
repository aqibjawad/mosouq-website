import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Row, Col, Container } from "react-bootstrap";
import ReactStars from "react-stars";
import { IoStar } from "react-icons/io5";
import { GET } from "../../apicontrollers/apiController";

const HomeReview = () => {
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const result = await GET(`reviews/getAll`);

      // Debug: log the result to see what we're getting
      console.log("Reviews API Response:", result);

      let reviewsArray = [];

      // Handle different possible response structures
      if (Array.isArray(result)) {
        reviewsArray = result;
      } else if (result && Array.isArray(result.data)) {
        reviewsArray = result.data;
      } else if (result && Array.isArray(result.reviews)) {
        reviewsArray = result.reviews;
      } else {
        console.warn("Unexpected API response structure for reviews:", result);
        reviewsArray = [];
      }

      // Filter approved reviews only if we have an array
      const approved = reviewsArray.filter(
        (review) => review.approved === true
      );
      setApprovedReviews(approved);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err.message || "Failed to fetch reviews");
      setApprovedReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Container fluid className="px-3 px-md-5">
          <h2>Loading reviews...</h2>
        </Container>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Container fluid className="px-3 px-md-5">
          <h2>Error loading reviews</h2>
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  // Show empty state
  if (!Array.isArray(approvedReviews) || approvedReviews.length === 0) {
    return (
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Container fluid className="px-3 px-md-5">
          <h2>Recent Reviews</h2>
          <p>No approved reviews available at the moment</p>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Container fluid className="px-3 px-md-5">
        <div>
          <h2>Recent Reviews</h2>
          <p>Hear what our users have to say about us</p>
        </div>
        <Marquee className="mt-5">
          {approvedReviews.map((review, index) => (
            <div
              key={review._id || review.id || index}
              className="card my-4 review_card border-0 ms-3"
              style={{ width: "424px" }}
            >
              <div className="card-body">
                <div className="d-flex">
                  <div>
                    <ReactStars
                      count={5}
                      color2="#FFAA00"
                      value={review.rating || 0}
                      size={35}
                      edit={false}
                    />
                  </div>
                </div>
                <h6 className="m-0 mb-2">{review.title || "No title"}</h6>
                <p className="review-descrp">
                  "{review.description || "No description"}"
                </p>

                <Row className="mt-5">
                  <Col lg={9}>
                    <div className="d-flex">
                      <img
                        src="/review-person.png"
                        alt="Reviewer"
                        style={{
                          height: "50px",
                          width: "50px",
                          marginRight: "1rem",
                        }}
                      />
                      <h5>{review?.user?.name || "Anonymous"}</h5>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <img src="/quote-review.png" alt="Quote" />
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </Marquee>
      </Container>
    </div>
  );
};

export default HomeReview;
