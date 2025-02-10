import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import parse from "html-react-parser";

const ExploreDubai = () => {
  const [dubai, setDubai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://blogs.mosouq.ae//wp-json/wp/v2/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDubai(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const extractImageSrc = (content) => {
    try {
      const parsed = parse(content);
      if (Array.isArray(parsed)) {
        for (let element of parsed) {
          if (element?.props?.children?.props?.src) {
            return element.props.children.props.src;
          }
          if (element?.props?.src) {
            return element.props.src;
          }
        }
      }
      const match = content.match(/data-orig-file="([^"]+)"/);
      if (match && match[1]) {
        return match[1];
      }
      return "/api/placeholder/400/300";
    } catch (error) {
      console.error("Error extracting image:", error);
      return "/api/placeholder/400/300";
    }
  };

  const cleanText = (html) => {
    return (
      html
        ?.replace(/<\/?[^>]+(>|$)/g, "")
        ?.replace(/&hellip;/g, "...")
        ?.replace(/&nbsp;/g, " ")
        ?.replace(/&amp;/g, "&")
        ?.replace(/&quot;/g, '"')
        ?.trim() || ""
    );
  };

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <h3>Loading...</h3>
      </Container>
    );

  if (error)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <h3>Error: {error}</h3>
      </Container>
    );

  return (
    <div className="carousel-container">
      <Container fluid className="px-md-5 px-3">
        <Row className="mt-5">
          <Col xs={12}>
            {/* <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="fw-bold mb-2">Explore Dubai</h2>
              </div>
              <Link to="/" className="btn btn-primary">
                View All
              </Link>
            </div> */}
            <p className="text-muted mb-0">
              Discover amazing places in Dubai through our recommendations!
            </p>
          </Col>
        </Row>
      </Container>

      <Container fluid className="p-0">
        <Marquee className="" gradient={false} speed={40}>
          {dubai.map((item, index) => (
            <Link
              key={index}
              to={`/blog-details/${cleanText(item.title?.rendered)
                .replace(/\s+/g, "-")
                .toLowerCase()}/${item.id}`}
              className="text-decoration-none"
            >
              <Card
                className="mx-3"
                style={{
                  width: "300px",
                  border: "none",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", height: "400px" }}>
                  <Card.Img
                    variant="top"
                    src={extractImageSrc(item.content.rendered)}
                    alt={cleanText(item.title?.rendered) || "Untitled"}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
                      padding: "20px",
                      borderRadius: "0 0 12px 12px",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginBottom: "8px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cleanText(item.title?.rendered) || "Untitled"}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "0.9rem",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4",
                      }}
                    >
                      {cleanText(item.excerpt?.rendered)}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Marquee>
      </Container>
    </div>
  );
};

export default ExploreDubai;
