import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Accordion,
  Form,
  Carousel,
  ListGroup,
} from "react-bootstrap";
import { Star, Clock, Users, ChevronRight } from "lucide-react";

import BlogSection from "./blog.details";

import HomeDeals from "../home/home.deals";
import LocationSection from "./location";

import { useParams } from "react-router-dom";

import { GET } from "../../apicontrollers/apiController";

const hotelData = [
  {
    id: 1,
    name: "Al Jaddaf Rotana Suite Hotel",
    location: "Al Jaddaf Dubai",
    rating: 5,
    people: 2,
    score: 4.6,
    reviews: 7,
    image: "/api/placeholder/400/300",
  },
  // Add more hotels as needed
];

const BlogDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const [deals, setDeals] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);

  useEffect(() => {
    GET(`deal/get-deal/${id}`).then((result) => {
      setDeals(result);
    });
  }, []);

  return (
    <div>
      <Container className="my-5">
        {/* Main Product Section */}
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={deals.deal_image}
                alt="Luxury Getaways Gift Box"
              />

              {/* Thumbnail Images */}
              {/* <Row className="p-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Col key={num} xs={2}>
                    <img
                      src={`/api/placeholder/100/100`}
                      alt={`Thumbnail ${num}`}
                      className="img-fluid"
                    />
                  </Col>
                ))}
              </Row> */}
            </Card>
          </Col>

          <Col md={6}>
            <h4>{deals.name}</h4>
            <h2>{deals.description}</h2>

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
              {/* <p>Make your gift unforgettable with free flowers!</p> */}
              <Button variant="outline-danger"> order </Button>
            </div>

            {/* <Form className="mb-4">
              <Form.Group className="d-flex align-items-center gap-3">
                <Form.Label className="m-0">Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: "100px" }}
                />
                <Button variant="danger" size="lg">
                  Buy Now
                </Button>
              </Form.Group>
            </Form> */}

            {/* Payment Options */}
            <div className="bg-light p-3 rounded mb-4">
              <p className="mb-2">4 interest-free payments of AED 124.75</p>
              <p className="mb-0">
                Or split in 4 payments of AED 124.75 - No late fees
              </p>
            </div>

            {/* What's Included Section */}
            <Card className="mb-4">
              <Card.Header>
                <h4 className="m-0">What is included</h4>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  The gift box includes a one-night stay with breakfast for two
                  at a luxury hotel across the UAE
                </ListGroup.Item>
                <ListGroup.Item>
                  Buy now and book later within 12 months
                </ListGroup.Item>
                <ListGroup.Item>
                  Free Wi-Fi in public areas and all hotel rooms
                </ListGroup.Item>
                <ListGroup.Item>
                  Unlimited use of recreational facilities subject to
                  availability
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Hotels Grid */}
        <h3 className="mb-4">
          Some of the top locations available in this gift box
        </h3>
        <Row className="g-4">
          {hotelData.map((hotel) => (
            <Col key={hotel.id} md={6} lg={3}>
              <Card>
                <Card.Img variant="top" src={hotel.image} />
                <Card.Body>
                  <Card.Title>{hotel.name}</Card.Title>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="gold" stroke="gold" />
                    ))}
                  </div>
                  <p className="mb-1">{hotel.location}</p>
                  <div className="d-flex align-items-center gap-2">
                    <Users size={16} />
                    <span>{hotel.people} People</span>
                    <span>•</span>
                    <Star size={16} />
                    <span>
                      {hotel.score}/5 ({hotel.reviews})
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary">
            See More <ChevronRight size={16} />
          </Button>
        </div>
      </Container>
      <HomeDeals />
    </div>
  );
};

export default BlogDetails;
