import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeReview from "../home/home.reviews";
import HomePartners from "../home/home.partners";
import "./index.css";
import WhyChoose from "../../components/whyChoose";
import GrowBusinesses from "../../components/growbusinesses";
import Features from "../../components/features";

const Jobs = () => {
  return (
    <div id="about">
      <div className="about-container">
        <div className="about-head">About Us</div>
        <p className="about-subhead">Mosouq. connects people with businesses</p>
      </div>

      <Container fluid className=" px-3 px-md-5">
        <Row className="mt-5">
          <Col lg={6}>
            <h2 className="left-col-head">About MOSOUQ.</h2>
            <p className="left-col-body pt-3">
              Lorem ipsum dolor sit amet consectetur. Semper ullamcorper integer
              nulla magna facilisis facilisis odio. Nec viverra lorem mattis sit
              odio morbi odio. Ut cras in elementum augue ornare. Mattis lacus
              tellus congue
            </p>
            <p className="left-col-body">
              pellentesque quam massa lobortis scelerisque. Diam morbi vitae
              tempus malesuada ac purus vulputate feugiat. Condimentum purus
              nibh feugiat diam aliquet sollicitudin. Vel lorem sed sem
              suspendisse integer. Eu nisi amet netus gravida tempus. Sit neque
              mauris mauris et magna porta non vitae duis.
            </p>
          </Col>

          <Col lg={6}>
            <div className="right-col-head">Consumers:</div>
            <div className="right-col-subhead">Share their Experiences</div>
            <div className="arrow-container">
              <img src="/Arrow 1.png" alt="Arrow" />
            </div>
            <div className="right-col-body px-5 w-50 mx-auto">
              Mosouq. connects people with your businesses
            </div>
            <div className="arrow-container">
              <img src="/Arrow 1.png" alt="Arrow" />
            </div>
            <div className="right-col-head">Business:</div>
            <div className="right-col-subhead">Create better Experience</div>
          </Col>
        </Row>

        <WhyChoose />
        <GrowBusinesses />
      </Container>
      <Features />
      <HomePartners />

      <div className="home-review-container">
        <HomeReview />
      </div>
    </div>
  );
};

export default Jobs;
