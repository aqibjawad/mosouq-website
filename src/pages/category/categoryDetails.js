import React, { useState, useEffect } from "react";
import { Row, Col, Spinner, Card } from "react-bootstrap";
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
      <Row>
        {businesses.map((business, index) => (
          <Col lg={5} md={6} sm={12} key={index} className="mb-5">
            <Link
              to={`/business-details/${business?.authDetails?.company.replace(
                /\s+/g,
                "-"
              )}/${business.businessId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card className="">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <img
                        src={business.logo}
                        alt="Business Image"
                        className="img-fluid rounded"
                        style={{
                          width: "100%",
                          height: "60px",
                          objectFit: "contain",
                        }}
                      />
                    </Col>

                    <Col xs={8}>
                      <h6 className="mb-1 fw-bold text-truncate">
                        {business?.authDetails?.name}
                      </h6>

                      <div className="small text-muted d-flex align-items-center gap-1">
                        <span>250 reviews</span>
                        <span>•</span>
                        <span className="fw-bold">Good</span>
                      </div>

                      <div className="d-flex align-items-center gap-1">
                        <AiFillStar
                          style={{ color: "#ffc107", fontSize: "14px" }}
                        />
                        <AiFillStar
                          style={{ color: "#ffc107", fontSize: "14px" }}
                        />
                        <AiFillStar
                          style={{ color: "#ffc107", fontSize: "14px" }}
                        />
                        <AiFillStar
                          style={{ color: "#ffc107", fontSize: "14px" }}
                        />
                        <AiOutlineStar
                          style={{ color: "#ffc107", fontSize: "14px" }}
                        />
                        <span className="ms-1 text-muted small">4.8</span>
                      </div>

                      <div className="small">
                        <Link
                          to={business.website}
                          className="text-decoration-none"
                        >
                          Website
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryDetails;
