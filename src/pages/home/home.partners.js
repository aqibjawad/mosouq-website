import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Marquee from "react-fast-marquee";

import { GET } from "../../apicontrollers/apiController";

import { Link } from "react-router-dom";

const HomeBusiness = () => {
  const [partner, setPartner] = useState([]);

  useEffect(() => {
    GET("company/get-companies").then((result) => {
      setPartner(result);
    });
  }, []);

  return (
    <div className="logos-carousel">
      <Container>
        <div style={{ marginTop: "3rem" }}>
          <div
            className="text-center"
            style={{ fontWeight: "600", fontSize: "32px" }}
          >
            Trusted by the biggest companies
          </div>

          <div
            className="text-center"
            style={{ fontWeight: "400", fontSize: "17px" }}
          >
            We're not just a service provider; we're your trusted partner,
            dedicated to understanding and <br /> surpassing your expectations
            with tailored solutions
          </div>
        </div>

        <div>
          <Marquee
            className="mt-5"
            gradient={false}
            style={{ overflow: "hidden" }}
          >
            {partner.map((partners, index) => (
              <Link to={partners.link} target="_blank">
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                  style={{ margin: "0 5rem" }}
                >
                  <img
                    style={{ maxWidth: "100%", height:'100px' }}
                    src={partners.companies_image}
                    alt="Logo 1"
                  />
                </div>
              </Link> 
            ))}
          </Marquee>
        </div>
      </Container>
    </div>
  );
};

export default HomeBusiness;
