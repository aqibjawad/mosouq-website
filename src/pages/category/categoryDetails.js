import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GET } from "../../apicontrollers/apiController";
import { useParams, Link } from "react-router-dom";

const CategoryDetails = ({ name }) => {
  const { id } = useParams();
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    GET(`business-profile/category-business?category=${id}`).then((result) => {
      setBusinesses(result);
    });
  }, [id]);

  // const isBusinessOpen = (fromTime, toTime) => {
  //   const currentTime = new Date();
  //   const [fromHours, fromMinutes] = fromTime;
  //   const [toHours, toMinutes] = toTime;

  //   const openingTime = new Date(currentTime);
  //   const closingTime = new Date(currentTime);

  //   openingTime.setHours(fromHours, fromMinutes, 0);
  //   closingTime.setHours(toHours, toMinutes, 0);

  //   return currentTime >= openingTime && currentTime <= closingTime;
  // };

  return (
    <>
      <div className="cat-Head">Near San Francisco, California</div>
      <div className="cat-descrp">Top 10 Contractors</div>

      {businesses.map((business, index) => {
        // const openStatus = isBusinessOpen(business.fromTime, business.toTime);

        return (
          <Link
            to={`/business-details/${business.businessId}`}
            key={index}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="p-4 border rounded-lg shadow-lg max-w-xl"
              style={{
                marginTop: "2rem",
                marginBottom: "5rem",
                marginLeft: "3rem",
                marginRight: "4rem",
              }}
            >
              <Row>
                <Col lg={3} sm={12}>
                  <img
                    src={business.logo}
                    alt={"Business Image"}
                    className="h-16 rounded-lg"
                    style={{ width: "100%" }}
                  />
                </Col>

                <Col lg={9} sm={12}>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold flex items-center">
                      {business.businessName}
                    </h2>
                    <div className="text-gray-500">
                      250 reviews &bull; <span className="font-bold">Good</span>
                    </div>
                    <div className="flex items-center">
                      <AiFillStar className="text-yellow-500" />
                      <AiFillStar className="text-yellow-500" />
                      <AiFillStar className="text-yellow-500" />
                      <AiFillStar className="text-yellow-500" />
                      <AiOutlineStar className="text-yellow-500" />
                      <span className="ml-2 text-gray-700">4.8</span>
                    </div>
                    <p className="text-gray-700 mt-2">
                      {business.description}
                    </p>

                    <div className="text-gray-500">
                      <Link to={business.website}>Website</Link>
                    </div>
                    <Row>
                      {/* <Col lg={1} md={4} sm={12}>
                        <div
                          className={`font-bold mt-1 ${
                            openStatus ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {openStatus ? "Open" : "Closed"}
                        </div>
                      </Col> */}
                      <Col lg={3} md={4} sm={12}>
                        <div className="text-gray-500 text-sm">
                          {business.fromTime} AM - {business.toTime} PM
                        </div>
                      </Col>
                      <Col lg={8} md={4} sm={12}>
                        <div className="text-gray-400 text-xs">
                          <Row>
                            <Col>Hours updated over 4 months ago</Col>
                            <Col>
                              <div
                                style={{
                                  background: "#B9DCFF99",
                                  width: "90px",
                                  height: "23px",
                                  textAlign: "center",
                                  borderRadius: "4px",
                                }}
                              >
                                See Hours
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CategoryDetails;
