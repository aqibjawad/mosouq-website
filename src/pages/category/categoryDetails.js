import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GET } from "../../apicontrollers/apiController";
import { useParams, Link } from "react-router-dom";

const CategoryDetails = ({ name }) => {
  const id = localStorage.getItem("selectedCategoryId");

  const [businesses, setBusinesses] = useState([]);
  const [dataSource, setDataSource] = useState("category");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    GET(`business-profile/category-business?category=${id}`)
      .then((result) => {
        if (result && result.length > 0) {
          setBusinesses(result);
          setDataSource("category");
        }
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  const handleBusinessClick = (business) => {
    localStorage.setItem("selectedBusinessId", business.businessId);
  };

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

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <div className="cat-Head">Near San Francisco, California</div>
      <div className="cat-descrp">Top 10 Contractors</div>
      {businesses.map((business, index) => (
        <Link
          to={`/business/${business?.category?.name.replace(
            /\s+/g,
            "-"
          )}/${business?.authDetails?.company.replace(/\s+/g, "-")}`}
          key={index}
          onClick={() => handleBusinessClick(business)}
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
                    {business?.authDetails?.company}
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
                    {isHTML(business.description) ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: business.description.slice(0, 500),
                        }}
                      />
                    ) : (
                      <p>{business.description}</p>
                    )}
                  </p>
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
