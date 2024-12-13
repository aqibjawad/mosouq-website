import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";

import { useParams } from "react-router-dom";

import parse from "html-react-parser";

const DetailsBlogs = () => {
  const { id } = useParams();

  const [dubai, setDubai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://public-api.wordpress.com/wp/v2/sites/fawadexe.wordpress.com/posts/${id}`
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
    <div>
      <div
        style={{ marginTop: "10rem", marginLeft: "4rem", marginRight: "4rem" }}
      >
        <div
          style={{ fontWeight: "700", fontSize: "25px", textAlign: "center" }}
        >
          {dubai.title?.rendered.replace(/&nbsp;/g, " ")}
        </div>

        <div
          style={{
            fontWeight: "400",
            fontSize: "20px",
            color: "#454545",
            textAlign: "center",
          }}
        >
          {dubai.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "")}
        </div>

        <Row>
          <Col className="mt-5 mb-5" lg={8} md={6} sm={12}>
            <div>
              {/* <img
                className="image-blog-details"
                src={extractImageSrc(dubai.content?.rendered)}
                alt={dubai.title?.rendered}
              /> */}

              <div className="blog-detail-descrp">
                {parse(dubai.content?.rendered || "")}
              </div>
            </div>
          </Col>

          <Col className="mt-5 mb-5" lg={4} md={6} sm={12}>
            <div>
              <img
                className="image-blog-details"
                src="https://placehold.co/500x600"
                alt={dubai.title?.rendered}
              />

            </div>

            <div className="mt-5">
              <img
                className="image-blog-details"
                src="https://placehold.co/500x700"
                alt={dubai.title?.rendered}
              />

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsBlogs;
