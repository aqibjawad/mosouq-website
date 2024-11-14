import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
// import "./GrowBusinesses.css";
import { Link } from "react-router-dom";
const GrowBusinesses = () => {
  return (
    <div id="why_choose" className="  py-5">

      <Row className=" align-items-center  g-5"> 
        <Col lg={6}>
          <div className=" w-100 border-0  m-0  choose_card">
           
            <div className=" pt-4">
            
              <h2>We help people Grow their businesses</h2>
              <p className=" fs-5 py-3">
              Lorem ipsum dolor sit amet consectetur. Semper ullamcorper integer nulla magna facilisis facilisis odio. Nec viverra lorem mattis sit odio morbi odio. Ut cras in elementum augue ornare. Mattis lacus tellus congue

              </p>
              <button className="business-button-header w-50">
            
            Register Buisness
         
          </button>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="text-center w-100  border-0 m-0   choose_card">
            <div>
              <Image src={"/Pexels Photo by Christina Morillo.png"} alt="" className=" w-100" />
            </div>
           
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GrowBusinesses;
