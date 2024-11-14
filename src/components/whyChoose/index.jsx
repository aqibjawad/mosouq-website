import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import "./whyChoose.css";
const WhyChoose = () => {
  return (
    <div id="why_choose" className="  py-5">

       <div className=" text-center mb-5">
       <h2>Why choose MOSOUQ.?</h2>
       <p className="about-subhead">Mosouq. connects people with businesses</p>
       </div>
      <Row className=" g-4">
        <Col lg={3}>
          <Card className=" w-100  m-0 text-center p-5 choose_card">
            <div>
              <Image src={"/goal.png"} />
            </div>
            <div className=" pt-4">
              <h4>Career</h4>
              <p>
                Start a five star career with measniful opportunities engaing
                learning program
              </p>
            </div>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center w-100  m-0  p-5 choose_card">
            <div>
              <Image src={"/news.png"} />
            </div>
            <div className=" pt-4">
              <h4>Newsroom</h4>
              <p>News and information about Mosouq & our people</p>
            </div>
          </Card>
        </Col>{" "}
        <Col lg={3}>
          <Card className="text-center w-100 p-5  m-0  choose_card">
            <div>
              <Image src={"/investor.png"} />
            </div>
            <div className=" pt-4">
              <h4>Investor Relation</h4>
              <p>
                Get all the finacial information you’re looking for about Mosouq
              </p>
            </div>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center w-100 m-0  p-5 choose_card">
            <div>
              <Image src={"/trustworthiness.png"} />
            </div>
            <div className=" pt-4">
              <h4>Trust & saftey</h4>
              <p>
                Learn how Mosoq works hard to maintain our communitiy’s trust{" "}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WhyChoose;
