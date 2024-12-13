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

const DealDetails = () => {
  const [quantity, setQuantity] = useState(1);

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
    GET(`deal/get-deal/${id}`).then((result) => {
      setDeals(result);
    });
  }, []);

  // Function to get thumbnail images
  const getThumbnails = () => {
    if (deals.images && deals.images.length > 0) {
      // If more than 5 images, slice to first 5
      return deals.images.slice(0, 5);
    }
    // Fallback to placeholder if no images
    return [
      "/api/placeholder/100/100",
      "/api/placeholder/100/100",
      "/api/placeholder/100/100",
      "/api/placeholder/100/100",
      "/api/placeholder/100/100",
    ];
  };

  const handleRating = (rating) => {
    console.log(`Selected rating: ${rating}`);
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic
    console.log({ reviewTitle, reviewDescription });
    handleClose();
  };

  return (
    <div style={{ marginTop: "10rem" }}>
      {/* Main Product Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={
                deals.images && deals.images[0]
                  ? deals.images[0]
                  : deals.deal_image
              }
              alt="Luxury Getaways Gift Box"
            />

            {/* Thumbnail Images */}
            <Row className="p-2">
              {getThumbnails().map((image, num) => (
                <Col key={num} xs={2}>
                  <img
                    src={image}
                    alt={`Thumbnail ${num + 1}`}
                    className="img-fluid"
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col md={6}>
          <h1>{deals.businessName}</h1>
          <h2>{deals.name}</h2>

          <div className="d-flex align-items-center gap-3 mb-3">
            <Badge bg="light" text="dark">
              <Clock size={16} /> One Night
            </Badge>
            <Badge bg="light" text="dark">
              <Users size={16} /> 2 People
            </Badge>
            <Badge bg="light" text="dark">
              <Star size={16} /> 4.9 (36)
            </Badge>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <h3 className="m-0">AED {deals.price || 0}</h3>
            <span className="text-decoration-line-through text-muted">
              AED {deals.price1 || 0}
            </span>
            <Badge bg="danger"> {deals.discount || 0} % OFF</Badge>
          </div>

          <div className="mb-4">
            <Button variant="outline-danger"> order </Button>
          </div>

          <Card style={{ width: "100%", marginLeft:"-10rem" }} className="mb-4">
            <Card.Header>
              <h4 className="m-0">What is included</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                The gift box includes a one-night stay with breakfast for two at
                a luxury hotel across the UAE
              </ListGroup.Item>
              <ListGroup.Item>
                Buy now and book later within 12 months
              </ListGroup.Item>
              <ListGroup.Item>
                Free Wi-Fi in public areas and all hotel rooms
              </ListGroup.Item>
              <ListGroup.Item>
                Unlimited use of recreational facilities subject to availability
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Hotels Grid */}
      <h3
        className="mb-4"
        style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
      >
        {deals.description}
      </h3>

      <Row style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
        <Col xs={12} md={4}>
          <div className="rounded shadow-sm p-3 mb-3">
            <LocationSection dealData={deals} />
          </div>
        </Col>
        {/* <Col xs={12} md={12}>
          <div className="rounded shadow-sm p-3 mb-3">
            <HomeDeals />
          </div>
        </Col> */}
      </Row>

      {/* Reviews Section */}
      <div style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
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
