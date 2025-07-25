import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Marquee from "react-fast-marquee";

import { GET } from "../../apicontrollers/apiController";

import { Link } from "react-router-dom";

const HomeBusiness = () => {
  const [partner, setPartner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const result = await GET("company/get-companies");

        // Ensure result is an array
        if (Array.isArray(result)) {
          setPartner(result);
        } else if (result && Array.isArray(result.data)) {
          // In case the API returns { data: [...] }
          setPartner(result.data);
        } else {
          console.warn("API response is not an array:", result);
          setPartner([]);
        }
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError(err.message);
        setPartner([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="logos-carousel">
        <Container>
          <div className="text-center" style={{ padding: "3rem 0" }}>
            Loading partners...
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="logos-carousel">
        <Container>
          <div className="text-center" style={{ padding: "3rem 0" }}>
            Error loading partners: {error}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="logos-carousel">
      <Container>
        <div style={{ marginTop: "3rem" }}>
          <div
            className="text-center"
            style={{ fontWeight: "600", fontSize: "32px" }}
          >
            Our Trusted Brands
          </div>
        </div>

        <div>
          {/* Only render Marquee if we have partners */}
          {Array.isArray(partner) && partner.length > 0 ? (
            <Marquee
              className="mt-5"
              gradient={false}
              style={{ overflow: "hidden" }}
            >
              {partner.map((partners, index) => (
                <Link
                  key={index}
                  to={partners.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ margin: "0 5rem" }}
                  >
                    <img
                      style={{ maxWidth: "100%", height: "100px" }}
                      src={partners.companies_image}
                      alt={`Partner ${index + 1}`}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </Link>
              ))}
            </Marquee>
          ) : (
            <div className="text-center mt-5">
              No partners available at the moment.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HomeBusiness;
