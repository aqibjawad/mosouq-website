import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GET } from "../../apicontrollers/apiController";
import { useParams, Link } from "react-router-dom";

const CategoryDetails = ({ name }) => {
  const { id } = useParams();
  const [businesses, setBusinesses] = useState([]);
  const [dataSource, setDataSource] = useState("category");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Try category API first
    GET(`business-profile/category-business?category=${id}`)
      .then((result) => {
        if (result && result.length > 0) {
          setBusinesses(result);
          setDataSource("category");
        } else {
          // If no results, try subcategory API
          return GET(`business-profile/subcategory-business?subcategory=${id}`);
        }
        return result;
      })
      .then((subResult) => {
        if (subResult && subResult.length > 0) {
          setBusinesses(subResult);
          setDataSource("subcategory");
        }
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Loader component
  const LoaderComponent = () => (
    <div
      className="text-center"
      style={{ marginTop: "7rem", marginBottom: "7rem" }}
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <img
          src="/mosouq-logo.png"
          alt="Company Logo"
          className="mb-4"
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );

  // If loading, show loader
  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <div className="cat-Head">Near San Francisco, California</div>
      <div className="cat-descrp">Top 10 Contractors</div>

      {businesses.map((business, index) => (
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
                  <p className="text-gray-700 mt-2">{business.description}</p>

                  <div className="text-gray-500">
                    <Link to={business.website}>Website</Link>
                  </div>
                  <Row>
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
      ))}
    </>
  );
};

export default CategoryDetails;
