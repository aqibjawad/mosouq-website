import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./index.css";
import { GET } from "../../apicontrollers/apiController";

const Details = () => {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    GET(`subcategory/get-subcategories/${id}`)
      .then((result) => {
        setSubcategory(result);
      })
      .catch((error) => {
        console.error("Error fetching subcategory:", error);
        setSubcategory(null);
      });
  }, [id]);

  if (!subcategory) {
    return <div>Loading...</div>;
  }

  const { category } = subcategory;
  const categoryImage = category ? category.category_image : null;

  return (
    <div style={{ marginTop: "5rem" }}>
      <Row>
        <Col lg={3} sm={12}>
          {categoryImage && (
            <img
              src={categoryImage}
              alt={category ? category.name : "Category Image"}
              className="h-16 rounded-lg"
              style={{ width: "100%" }}
            />
          )}
        </Col>

        <Col lg={9} sm={12}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold flex items-center">
              {category ? category.name : "Category Name"}
              {category && <MdVerified className="text-blue-500 ml-2" />}
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
              Lorem ipsum dolor sit amet consectetur. Arcu scelerisque nisl
              bibendum in vulputate dolor venenatis cursus
            </p>

            <Row>
              <Col lg={1} md={4} sm={12}>
                <div className="text-red-500 font-bold mt-1" style={{color:"red"}}>Closed</div>
              </Col>

              <Col lg={3} md={4} sm={12}>
                <div className="text-gray-500 text-sm">6:00 AM - 7:00 PM</div>
              </Col>

              <Col lg={8} md={4} sm={12}>
                <div className="text-gray-400 text-xs">
                  <Row>
                    <Col>
                       Hours updated over 4 months ago
                    </Col>

                    <Col>
                       <div style={{background: "#B9DCFF99", width:"90px", height:"23px", textAlign:"center", borderRadius:"4px"}}>See Hours</div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={2} md={3} sm={6}>
          <div className="descp-button">Leave a Review</div>
        </Col>

        <Col lg={2} md={3} sm={6}>
          <div className="descp-button">Add a Photo</div>
        </Col>

        <Col lg={2} md={3} sm={6}>
          <div className="descp-button">Share</div>
        </Col>

        <Col lg={2} md={3} sm={6}>
          <div className="descp-button">Save</div>
        </Col>

        <Col lg={2} md={3} sm={6}>
          <div className="descp-button">Follow</div>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
