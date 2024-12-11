import React, { useState, useEffect } from "react";
import "./index.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import parse from "html-react-parser";

const ExploreDubai = () => {
  
  const [dubai, setDubai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/wp/v2/sites/fawadexe.wordpress.com/posts"
    )
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
      // Parse the HTML content
      const parsed = parse(content);

      // If parsed content is an array, find the figure/img element
      if (Array.isArray(parsed)) {
        for (let element of parsed) {
          // Check if element is a figure with img
          if (element?.props?.children?.props?.src) {
            return element.props.children.props.src;
          }
          // Check if element is directly an img
          if (element?.props?.src) {
            return element.props.src;
          }
        }
      }
      // If content contains data-orig-file attribute, extract that
      const match = content.match(/data-orig-file="([^"]+)"/);
      if (match && match[1]) {
        return match[1];
      }

      return "https://via.placeholder.com/400x300"; // Fallback image
    } catch (error) {
      console.error("Error extracting image:", error);
      return "https://via.placeholder.com/400x300"; // Fallback image
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="carousel-container">
      <Container fluid className="px-md-5 px-3">
        <Row className="justify-content-between mt-5">
          <Col sm="6">
            <h2>Explore Dubai</h2>
            <p>Discover amazing places in Dubai through our recommendations!</p>
          </Col>
          <Col sm="auto">
            <Link to="/" className="business-button-header">
              View All
            </Link>
          </Col>
        </Row>
      </Container>

      <Container fluid className="p-0 ml-5">
        <Marquee className="mt-5 ml-5">
          {dubai.map((item, index) => (
            <Link to={`/blog-details/${item.id}`}>
              <div key={index} className="image-container mx-3">
                <img
                  src={extractImageSrc(item.content.rendered)}
                  alt={item.title?.rendered || "Untitled"}
                  style={{
                    width: "300px", // Fixed width for better control
                    height: "400px", // Fixed height for better control
                    borderRadius: "12px",
                    objectFit: "cover", // Ensures image covers area without stretching
                  }}
                />
                <div className="overlay">
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    {item.title?.rendered || "Untitled"}
                  </div>
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    {item.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") ||
                      ""}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </Container>
    </div>
  );
};

export default ExploreDubai;
