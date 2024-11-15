import React, { useState, useEffect, useRef } from "react";
import CarouselComponent from "../../components/carousel";
import { Col, Container, Image, Row } from "react-bootstrap";
import { IoStar } from "react-icons/io5";
import { Rating } from "react-simple-star-rating";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "react-bootstrap";

import { Loader } from "@googlemaps/js-api-loader";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { POST, GET } from "../../apicontrollers/apiController";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

import { FaWhatsapp } from "react-icons/fa"; 

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [businesses, setBusinesses] = useState("");
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [businessReviews, setBusinessesReviews] = useState([]);

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [starPercentages, setStarPercentages] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    GET(`business-profile/profile/${id}`).then((result) => {
      setBusinesses(result);
    });

    fetchReviews();
  }, [id]);

  const fetchReviews = () => {
    GET(`reviews/getRecord/${id}`).then((result) => {
      const approved = result.filter((review) => review.approved === true);
      setBusinessesReviews(approved);
      setApprovedReviews(approved);
      calculateRatings(approved);
    });
  };

  const calculateRatings = (reviews) => {
    const totalReviews = reviews.length;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalStars = 0;

    reviews.forEach((review) => {
      if (starCounts.hasOwnProperty(review.rating)) {
        starCounts[review.rating]++;
        totalStars += review.rating;
      }
    });

    const calculatedPercentages = {};
    for (const star in starCounts) {
      calculatedPercentages[star] =
        Math.round((starCounts[star] / totalReviews) * 100) || 0;
    }

    setStarPercentages(calculatedPercentages);

    const avgRating =
      totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : 0;
    setAverageRating(avgRating);
  };

  useEffect(() => {
    if (businesses && businesses.location) {
      const loader = new Loader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        version: "weekly",
      });

      loader
        .load()
        .then((google) => {
          try {
            const map = new google.maps.Map(mapRef.current, {
              center: {
                lat: parseFloat(businesses.location.lat),
                lng: parseFloat(businesses.location.lng),
              },
              zoom: 15,
            });

            new google.maps.Marker({
              position: {
                lat: parseFloat(businesses.location.lat),
                lng: parseFloat(businesses.location.lng),
              },
              map: map,
            });
          } catch (error) {
            console.error("Error creating map:", error);
          }
        })
        .catch((error) => {
          console.error("Error loading Google Maps JavaScript API:", error);
        });
    }
  }, [businesses]);

  useEffect(() => {
    if (businesses && businesses.location) {
      const loader = new Loader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        version: "weekly",
      });

      loader
        .load()
        .then(() => {
          try {
            if (window.google && window.google.maps) {
              const map = new window.google.maps.Map(mapRef.current, {
                center: {
                  lat: parseFloat(businesses.location.lat),
                  lng: parseFloat(businesses.location.lng),
                },
                zoom: 15,
              });

              new window.google.maps.Marker({
                position: {
                  lat: parseFloat(businesses.location.lat),
                  lng: parseFloat(businesses.location.lng),
                },
                map: map,
              });
            } else {
              console.error("Google Maps JavaScript API not loaded");
            }
          } catch (error) {
            console.error("Error creating map:", error);
          }
        })
        .catch((error) => {
          console.error("Error loading Google Maps JavaScript API:", error);
        });
    }
  }, [businesses]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userString);
    const userId = user._id;

    const reviewData = {
      rating: rating.toString(),
      title: reviewTitle,
      description: reviewDescription,
      userId: userId,
      businessId: id,
    };
    try {
      const res = await POST("reviews/addRecord", reviewData);
      if (!res.error) {
        toast("Added Done");
        GET(`reviews/getRecord/${id}`).then((result) => {
          setBusinessesReviews(result);
        });
        handleClose();
      } else {
        toast.error(res.sqlMessage);
      }
    } catch (error) {
      console.error("Error adding Reviews:", error);
      toast.error("Failed to add reviews. Please try again.");
    }
  };

  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleViewEmail = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");

    const user = JSON.parse(userString);
    const userId = user._id;

    const statsEmailData = {
      type: "email",
      userId: userId,
      businessId: id,
    };

    try {
      // POST request to add the review
      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast("Added Done");
      } else {
        toast.error(res.sqlMessage);
      }
    } catch (error) {
      console.error("Error adding Reviews:", error);
      toast.error("Failed to add reviews. Please try again.");
    }
  };

  const handleViewPhone = async (event) => {
    event.preventDefault();

    const userString = localStorage.getItem("user");

    const user = JSON.parse(userString);
    const userId = user._id;

    const statsEmailData = {
      type: "phone",
      userId: userId,
      businessId: id,
    };

    try {
      // POST request to add the review
      const res = await POST("businessStats/addRecord", statsEmailData);

      if (!res.error) {
        toast("Added Done");
      } else {
        toast.error(res.sqlMessage);
      }
    } catch (error) {
      console.error("Error adding Reviews:", error);
      toast.error("Failed to add reviews. Please try again.");
    }
  };

  return (
    <div className="property" style={{ marginTop: "10rem" }}>
      <CarouselComponent
        businessData={businesses}
        businessReviewsData={businessReviews}
      />

      <Container fluid className=" py-4 px-3 px-md-5">
        <Row className="g-5">
          <Col lg={8}>
            <div className=" top_btn">
              <button
                className="px-4 border py-2 rounded-3 bg-white text-dark d-flex align-items-center"
                onClick={handleShow}
              >
                <IoStar size={30} color="gray" className="pe-2" /> Leave a
                Review
              </button>
              <button className=" px-4  text-dark  border py-2 rounded-3 bg-white d-flex  align-items-center">
                <div className=" pe-2">
                  <img src="/w_camera.png" alt="" />
                </div>
                Add photo
              </button>
              <button className=" px-4  text-dark  border py-2 rounded-3 bg-white d-flex  align-items-center">
                <div className=" pe-2">
                  <img src="/save.png" alt="" />
                </div>
                save
              </button>
              <button className=" px-4  text-dark  border py-2 rounded-3 bg-white d-flex  align-items-center">
                <div className=" pe-2">
                  <AiOutlinePlus />
                </div>
                Follow
              </button>
            </div>

            <div
              className=" py-5"
              style={{ borderBottom: "1px solid #F1F1F1" }}
            >
              <div className="d-flex pb-4 align-items-center justify-content-between">
                <div>
                  <h2>Our Services</h2>
                  <p className=" m-0">
                    Pictures of business uploaded by consumers
                  </p>
                </div>
                <div></div>
              </div>
              {/* <Row>
                <Col lg={4}>
                  <Image src="/photo1.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <Image src="/photo2.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <Image src="/photo3.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
              </Row> */}
            </div>

            <div
              className=" py-5"
              style={{ borderBottom: "1px solid #F1F1F1" }}
            >
              <div className="d-flex pb-4 align-items-center justify-content-between">
                <div>
                  <h2>Recent Uploaded Photos</h2>
                  <p className=" m-0">
                    Pictures of business uploaded by consumers
                  </p>
                </div>
                <div>
                  <button className=" px-4    border py-3 rounded-3 bg-white d-flex  align-items-center">
                    <div className=" pe-2">
                      <img src="/w_camera.png" alt="" />
                    </div>
                    All photo
                  </button>
                </div>
              </div>
              <Row>
                <Col lg={4}>
                  <Image src="/photo1.png" className="w-100" alt="" />
                </Col>
                <Col lg={4}>
                  <Image src="/photo2.png" className="w-100" alt="" />
                </Col>
                <Col lg={4}>
                  <Image src="/photo3.png" className="w-100" alt="" />
                </Col>
              </Row>
            </div>

            {/* <div
              className=" py-5"
              style={{ borderBottom: "1px solid #F1F1F1" }}
            >
              <div className="d-flex pb-4 align-items-center justify-content-between">
                <div>
                  <h2>Menu</h2>
                  <p className=" m-0">Updated Menu of Resturant</p>
                </div>
                <div>
                  <span className="">View full menu</span>
                </div>
              </div>
              <Row>
                <Col lg={4}>
                  <Image src="/photo1.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <Image src="/photo2.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <Image src="/photo3.png" className="w-100" alt="" />
                  <div className=" pt-2">
                    <h5 className=" m-0 fs-5">Dish 1</h5>
                    <p className=" m-0">Pictures of business uploaded</p>
                  </div>
                </Col>
              </Row>
            </div> */}

            <Modal show={show} onHide={handleClose} className="w-100" centered>
              <Modal.Header className="border-0" closeButton>
                <Modal.Title>Overall Rating</Modal.Title>
              </Modal.Header>
              <Modal.Body className="pt-0">
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  size={40}
                  onPointerMove={onPointerMove}
                  className=""
                />

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
                <button onClick={handleClose} className="btn">
                  Close
                </button>

                <button onClick={handleReviewSubmit} className="btn bg-black">
                  Write Review
                </button>
              </Modal.Footer>
            </Modal>

            <div className=" bg-white rounded-3 p-3">
              <div className=" d-flex justify-content-between">
                <div>
                  <div className=" d-flex align-items-center">
                    <h4 className=" m-0">Reviews</h4>
                    <IoStar size={20} className=" mx-2" color="#FFB800" />
                    <h4 className="m-0"> {averageRating} </h4>
                  </div>
                  <p className=" m-0"> {businessReviews.length || 0} total</p>
                </div>
                <div>
                  <button onClick={handleShow} className=" btn bg-black">
                    Write Review
                  </button>
                </div>
              </div>

              {[5, 4, 3, 2, 1].map((star) => (
                <div
                  key={star}
                  className="d-flex align-items-center mt-3 justify-content-between"
                >
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      className=""
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

            {/* <div className="pt-4">
              <Row>
                {businessReviews.map((review, index) => (
                  <Col lg={6} key={index}>
                    <div className="bg-white rounded-3 p-4 mb-3">
                      <div className="d-flex align-items-center pb-3 justify-content-between">
                        <div className="d-flex align-items-center">
                        <span>{review.user.name}</span>
                          <div className="rating me-2">
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
                          </div>
                        </div>
                        <span>{review.rating}</span>
                      </div>
                      <h6 className="m-0 mb-2">{review.title}</h6>
                      <p>{review.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div> */}

            {approvedReviews && approvedReviews.length > 0 ? (
              <div className="pt-4">
                <Row>
                  {approvedReviews.map((review, index) => (
                    <Col lg={6} key={index}>
                      <div className="bg-white rounded-3 p-4 mb-3">
                        <div className="d-flex align-items-center pb-3 justify-content-between">
                          <div>
                            <h6 className="m-0">{review.user.name}</h6>
                          </div>
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

            <div className=" pt-5">
              <div className="d-flex pb-4 align-items-center justify-content-between">
                <div>
                  <h2>Location & Hours</h2>
                  <p className=" m-0">
                    Check out location and opening and closing Hours
                  </p>
                </div>
                <div>
                  <button className=" px-4    border py-3 rounded-3 bg-white d-flex  align-items-center">
                    <div className=" pe-2">
                      <img src="/w_camera.png" alt="" />
                    </div>
                    Visit Website
                  </button>
                </div>
              </div>
              <div
                ref={mapRef}
                style={{ width: "100%", height: "400px" }}
              ></div>
            </div>

            <div className=" pt-4">
              <span className="">OPENING AND CLOSING HOURS</span>
              <h4>
                {businesses.fromTime} A.M to{" "}
                <span style={{ color: "#F10000" }}>
                  {" "}
                  {businesses.toTime} P.M{" "}
                </span>
              </h4>
            </div>
          </Col>

          <Col lg={4}>
            <div className=" bg-white p-4 rounded-3 border">
              <h4 className=" m-0">Request quote & availability</h4>
              <p className="">Request your right away and availability</p>

              <button className=" w-100 py-2 button btn">
                Request a quote & availability
              </button>

              <div className=" pt-4">
                <h6 className=" m-0">Backed by Mosouq Guaranteed</h6>
                <p className=" pt-2 m-0">
                  Aardy.com Travel Insurance Marketplace allows you to compare
                  and purchase the best Travel Insurance from all major
                  providers. Would you like to visit each travel protection
                  carrier directly? Of course not. So, enjoy an easy experience
                  and find the best travel insurance with Aardy... Learn more
                </p>
              </div>
            </div>

            <div className=" bg-white p-4 rounded-3 border">
              <div className=" d-flex align-items-center">
                <div>
                  <img src="/budget-estimate.png" alt="" />
                </div>
                <h5 className=" ps-2 m-0">Free Estimates!</h5>
              </div>

              <div className=" pt-3">
                <button className=" w-100 py-2 button btn2">
                  Call for details
                </button>
              </div>
            </div>

            <div className=" bg-white p-4 rounded-3 border">
              <div className=" d-flex justify-content-between">
                <h5 className=" ps-2 m-0">Company activity</h5>
                <p style={{ color: "#387DE2" }}>View all</p>
              </div>
              <div className=" pt-3">
                <ul>
                  <li className=" pb-2">
                    <div>
                      <img src="/calculator.png" />
                    </div>
                    <h6 className=" m-0">Claimed profile</h6>
                  </li>
                  <li className=" pb-2">
                    <div>
                      <img src="/send.png" />
                    </div>
                    <h6 className=" m-0">
                      Ask for review - postive or negative
                    </h6>
                  </li>
                  <li className=" pb-2">
                    <div>
                      <img src="/pay.png" />
                    </div>
                    <h6 className=" m-0">Pay for extra features</h6>
                  </li>
                  <li className=" pb-2">
                    <div>
                      <img src="/message.png" />
                    </div>
                    <h6 className=" m-0">Replied to 80% of negative reviews</h6>
                  </li>
                  <li className=" pb-2">
                    <div>
                      <img src="/watch.png" />
                    </div>
                    <h6 className=" m-0">
                      Replies to negative reviews in {`<`} 2 days{" "}
                    </h6>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" bg-white p-4 rounded-3 border">
              <div className="">
                <h5 className=" m-0"> {businesses.businessName} </h5>

                <p>Information written by the company</p>

                <img src={businesses.logo} alt="" className=" w-100" />

                <p className="">{businesses.description}</p>
              </div>

              <div className=" pt-3">
                <h5 className=" m-0">Contact</h5>

                <ul className="pt-4">
                  {/* Email Section */}
                  <li>
                    <div>
                      <MdEmail size={24} className="mr-2" />
                    </div>
                    <Link to="#" onClick={handleViewEmail}>
                      {showEmail
                        ? businesses?.email
                        : businesses?.email
                        ? businesses.email.slice(0, 3) + "***"
                        : "N/A"}
                    </Link>
                  </li>

                  {/* Phone Section */}
                  <li>
                    <div>
                      <MdPhone size={24} className="mr-2" />
                    </div>
                    <Link to="#" onClick={handleViewPhone}>
                      {showPhone
                        ? businesses?.phone
                        : businesses?.phone
                        ? businesses.phone.slice(0, 3) + "***"
                        : "N/A"}
                    </Link>
                  </li>

                  <li>
                    <div>
                      <FaWhatsapp  size={24} className="mr-2" />
                    </div>
                    <Link
                      to={`https://wa.me/${businesses?.phone}`}
                      className="text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </Link>
                  </li>

                  {/* Location Section */}
                  <li className="">
                    <div>
                      <img src="/location.png" alt="Location" />
                    </div>
                    <p className="mt-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          businesses?.location || ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Business Location
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BusinessDetails;
