import React, {useState} from "react";
import { Row, Col } from "react-bootstrap";

import HomeReview from "../home/home.reviews";

import CustomPagination from "./pagination";

const CatDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Change this to the total number of pages you have

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="p-4 border rounded-lg shadow-lg max-w-xl"
      style={{
        marginTop: "2rem",
        marginLeft: "3rem",
        marginRight: "4rem",
        marginBottom: "7rem",
      }}
    >
      <Row>
        <Col lg={2} sm={12}>
          <img
            src="/Rectangle 103.png"
            alt={"Category Image"}
            className="h-16 rounded-lg"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>

        <Col lg={10} sm={12}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold flex items-center">
              Category Name
            </h2>
            <div className="text-gray-500">
              250 reviews &bull; <span className="font-bold">Good</span>
            </div>
          </div>
        </Col>
        <div className="border-t-2 border-gray-300 w-full mt-2"></div>
        <div>
          Lorem ipsum dolor sit amet consectetur. Aliquam diam vel suscipit
          adipiscing ornare posuere vitae amet. Tellus elit tellus tellus at.
          Mauris tincidunt scelerisque faucibus arcu lorem ullamcorper sed
          scelerisque dictum. Nullam tempor feugiat mattis bibendum molestie
          rhoncus risu... See more
        </div>

        <div>
          <Row>
            <Col lg={3} md={4} className="mt-5">
              <img src="/Rectangle 105.png" />
            </Col>

            <Col lg={3} md={4} className="mt-5">
              <img src="/Rectangle 105.png" />
            </Col>

            <Col lg={3} md={4} className="mt-5">
              <img src="/Rectangle 105.png" />
            </Col>

            <Col lg={3} md={4} className="mt-5">
              <img src="/Rectangle 105.png" />
            </Col>
          </Row>
        </div>

        <div>
          <HomeReview />
        </div>
      </Row>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CatDetails;
