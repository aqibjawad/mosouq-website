import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import ReactStars from "react-stars";

const DealCards = () => {
  const [dubai, setDubai] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/wp/v2/sites/fawadexe.wordpress.com/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        setDubai(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const extractImageSrc = (content) => {
    try {
      const match = content.match(/data-orig-file="([^"]+)"/);
      return match ? match[1] : "https://via.placeholder.com/400x300";
    } catch (error) {
      return "https://via.placeholder.com/400x300";
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Row style={{ overflow: "hidden" }}>
      {dubai.map((item, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100">
            <img
              src={extractImageSrc(item.content.rendered)}
              style={{ objectFit: "contain", width: "100%", padding: "10px" }}
              alt={item.title.rendered}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>
                <Row>
                  <Col>
                    <div
                      className="card-title-text"
                      style={{ color: "#404EED", fontSize: "12px" }}
                    >
                      {item.title.rendered}
                    </div>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <div
                      style={{
                        marginTop: "-1rem",
                        backgroundColor: "#B9DCFF99",
                        padding: "10px",
                        borderRadius: "5px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <ReactStars
                          count={1}
                          value={1}
                          size={20}
                          edit={false}
                        />
                        <div
                          className="rating-text"
                          style={{ fontSize: "12px", marginLeft: "10px" }}
                        >
                          4.3 (200+)
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text>
                <div
                  className="card-text-title"
                  style={{ fontSize: "18px", fontWeight: "600" }}
                >
                  {item.title.rendered}
                </div>
                <div
                  className="card-text-subtitle"
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#4D4D4D",
                  }}
                >
                  {item.excerpt.rendered
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .substring(0, 100)}
                  ...
                </div>
              </Card.Text>
              <Button
                className="mt-auto"
                style={{ width: "100%" }}
                variant="primary"
              >
                Request Consultation
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DealCards;
