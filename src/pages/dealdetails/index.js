import React, { useState, useEffect } from "react";

import {
  Col,
  Card,
  Button,
  Badge,
  Row,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { Star, Clock, Users, ChevronRight } from "lucide-react";

import HomeDeals from "../home/home.deals";
import LocationSection from "./location";

import { useParams } from "react-router-dom";

import { GET } from "../../apicontrollers/apiController";

import { IoStar } from "react-icons/io5";

import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const DealDetails = () => {
  const [similarDeals, setSimilarDeals] = useState([]);

  const { id } = useParams();

  const [deals, setDeals] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);

  const [show, setShow] = useState(false);
  const [averageRating, setAverageRating] = useState(4.5); // Example value
  const [businessReviews, setBusinessReviews] = useState([]);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [starPercentages, setStarPercentages] = useState({
    5: 50,
    4: 30,
    3: 10,
    2: 5,
    1: 5,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    GET(`deal/get-deal/${id}`)
      .then((result) => {
        setDeals(result);

        GET(`deal/get-deal-type/${result.type}`)
          .then((similarResult) => {
            // Filter out the current deal from similar deals
            const filteredSimilarDeals = similarResult.data.filter(
              (deal) => deal._id !== id
            );
            setSimilarDeals(filteredSimilarDeals);
          })
          .catch((error) => {
            console.error("Error fetching similar deals:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching deal details:", error);
      });
  }, [id]);

  const handleRating = (rating) => {
    console.log(`Selected rating: ${rating}`);
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic
    console.log({ reviewTitle, reviewDescription });
    handleClose();
  };

  const getThumbnails = () => {
    // Use images array if available, otherwise fallback to deal_image
    const images =
      deals.images && deals.images.length ? deals.images : [deals.deal_image];

    return images;
  };

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const thumbnails = getThumbnails();
    if (thumbnails.length > 0) {
      setActiveImage(thumbnails[0]);
    }
  }, [deals]);

  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };

  if (!activeImage) {
    return null;
  }
  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  return (
    <div style={{ marginTop: "7rem", marginLeft: "7rem", marginRight: "7rem" }}>
      <h1>{deals.name}</h1>
      {/* Main Product Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <div
              className="main-image-container"
              style={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Card.Img
                variant="top"
                src={activeImage}
                alt="Luxury Getaways Gift Box"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <Row
              className="p-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getThumbnails().map((image, num) => (
                <Col key={num} xs={2}>
                  <div
                    style={{
                      height: "80px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      cursor: "pointer",
                      opacity: activeImage === image ? 1 : 0.6,
                      border: activeImage === image ? "2px solid blue" : "none",
                    }}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${num + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col md={6}>
          <h2>{deals.BusinessName}</h2>

          <div className="d-flex align-items-center mb-3">
            <Badge bg="light" text="dark">
              <Users size={16} /> 2 People
            </Badge>
            <Badge bg="light" text="dark">
              <Star size={16} /> 4.9 (36)
            </Badge>
          </div>

          <div className="d-flex align-items-center mb-4">
            <h3 className="m-0">AED {deals.price || 0}</h3>
            <span className="text-decoration-line-through text-muted">
              AED {deals.price1 || 0}
            </span>
            <Badge bg="danger"> {deals.discount || 0} % OFF</Badge>
          </div>

          <div className="mb-4">
            <Button variant="outline-danger"> order </Button>
          </div>

          <div>
            <img
              className="image-blog-details"
              src="https://placehold.co/300x250"
            />
          </div>
        </Col>
      </Row>

      {/* Hotels Grid */}
      <h3 className="mb-4">
        {isHTML(deals.description) ? (
          <div
            dangerouslySetInnerHTML={{
              __html: deals.description,
            }}
            style={{ fontSize: "20px" }}
          />
        ) : (
          <p style={{ fontSize: "20px" }}>{deals.description}</p>
        )}
      </h3>

      <Row>
        <Col xs={12} md={4}>
          <div className="rounded shadow-sm p-3 mb-3">
            <LocationSection dealData={deals} />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <Row
            className="mt-4 cat-container"
            style={{ marginLeft: "3rem", marginRight: "3rem" }}
          >
            {similarDeals.map((businesses, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={6} className="mb-4">
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
                        <ReactStars
                          count={1}
                          value={1}
                          size={20}
                          edit={false}
                        />
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
        </Col>
      </Row>

      {/* Reviews Section */}
      <div>
        <div className="bg-white rounded-3 p-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <h4 className="m-0">Reviews</h4>
                <IoStar size={20} className="mx-2" color="#FFB800" />
                <h4 className="m-0"> {averageRating} </h4>
              </div>
              <p className="m-0">{businessReviews.length || 0} total</p>
            </div>
            <Button onClick={handleShow} className="btn bg-black">
              Write Review
            </Button>
          </div>
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="d-flex align-items-center mt-3 justify-content-between"
            >
              <div className="d-flex">
                <input
                  type="checkbox"
                  style={{ width: "20px", height: "20px" }}
                />
                <h6 className="ms-2">{star} star</h6>
              </div>
              <div className="w-75">
                <div
                  style={{ backgroundColor: "#F2F2F5", height: "12px" }}
                  className="w-100 rounded-3"
                >
                  <div
                    style={{
                      backgroundColor: "#000",
                      height: "12px",
                      width: `${starPercentages[star]}%`,
                    }}
                    className="bg-black rounded-3"
                  ></div>
                </div>
              </div>
              <h6>{starPercentages[star]}%</h6>
            </div>
          ))}
        </div>

        {approvedReviews && approvedReviews.length > 0 ? (
          <div className="pt-4">
            <Row>
              {approvedReviews.map((review, index) => (
                <Col lg={6} key={index}>
                  <div className="bg-white rounded-3 p-4 mb-3">
                    <div className="d-flex align-items-center pb-3 justify-content-between">
                      <h6 className="m-0">{review.user.name}</h6>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <IoStar
                            key={i}
                            size={20}
                            color={
                              i < parseInt(review.rating)
                                ? "#FFB800"
                                : "#D3D3D3"
                            }
                          />
                        ))}
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <h6 className="m-0 mb-2">{review.title}</h6>
                    <p>{review.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className="pt-4">
            <p>No approved reviews available for this business yet.</p>
          </div>
        )}

        {/* Review Modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header className="border-0" closeButton>
            <Modal.Title>Overall Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Click to rate</p>
            <div className="pt-3">
              <label className="mb-2">Review title</label>
              <input
                className="form-control"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </div>
            <div className="pt-3">
              <label className="mb-2">Product review</label>
              <textarea
                className="form-control"
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleReviewSubmit}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DealDetails;
