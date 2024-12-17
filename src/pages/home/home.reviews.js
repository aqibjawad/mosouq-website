import React, { useState, useEffect } from "react";

import Marquee from "react-fast-marquee";

import { Row, Col, Container } from "react-bootstrap";

import ReactStars from "react-stars";

import { IoStar } from "react-icons/io5";

import { GET } from "../../apicontrollers/apiController";

const HomeReview = () => {
  const [approvedReviews, setApprovedReviews] = useState([]);

  const fetchReviews = () => {
    GET(`reviews/getAll`).then((result) => {
      const approved = result.filter((review) => review.approved === true);
      setApprovedReviews(approved);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <Container fluid className=" px-3 px-md-5">
        <div>
          <h2 className="">Recent Reviews</h2>
          <p className="">Hear what our users hav e to say about us </p>
        </div>
        <Marquee className="mt-5">
          {approvedReviews.map((review) => (
            <div
              class="card my-4 review_card border-0  ms-3"
              style={{ width: "424px" }}
            >
              <div class="card-body">
                <div className="d-flex">
                  <div>
                    <ReactStars
                      count={5}
                      color2="#FFAA00"
                      value={review.rating}
                      size={35}
                      edit={false}
                    />
                  </div>
                </div>
                <h6 className="m-0 mb-2">{review.title}</h6>
                <p className="review-descrp">“{review.description}”</p>

                <Row className="mt-5">
                  <Col lg={9}>
                    <div className="d-flex">
                      <img
                        src="/review-person.png"
                        style={{
                          height: "50px",
                          width: "50px",
                          marginRight: "1rem",
                        }}
                      />
                      <h5> {review.user.name} </h5>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <img src="/quote-review.png" />
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
