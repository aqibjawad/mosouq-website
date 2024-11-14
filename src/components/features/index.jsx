import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import "./features.css";
const Features = () => {
  return (
    <div id="features" className="  py-5">

      <Container  fluid className=" px-3 px-md-5">
      <Row>
        <Col lg={3}>
          <div className=" w-100  m-0 choose_card">
           
            <div className=" pt-4">
              <h2 className=" m-0">238  <span>+ milion</span></h2>
              <p className=" fs-4">
              Reviews on MOSOUQ
              </p>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className=" w-100  m-0   choose_card">
           
            <div className=" pt-4">
              <h2 className=" m-0">1000  <span>+ </span></h2>
              <p className=" fs-4">
              Website reviewed
              </p>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className=" w-100  m-0   choose_card">
           
            <div className=" pt-4">
              <h2 className=" m-0">9 billion</h2>
              <p className=" fs-4">
              Monthly impression
              </p>
            </div>
          </div>
        </Col>


        <Col lg={3}>
          <div className=" w-100  m-0   choose_card">
           
            <div className=" pt-4">
              <h2 className=" m-0">2024</h2>
              <p className=" fs-4">
              Mosouq Lauched
              </p>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className=" w-100  m-0   choose_card">
           
            <div className=" pt-4">
            <h2 className=" m-0">850</h2>
              <p className=" fs-4">
              Employees
              </p>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className=" w-100  m-0   choose_card">
           
            <div className=" pt-4">
            <h2 className=" m-0">50  <span>+ </span></h2>
              <p className=" fs-4">
              Nationalities
              </p>
            </div>
          </div>
        </Col>
       
      </Row>
      </Container>
    </div>
  );
};

export default Features;
