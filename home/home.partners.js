import React from "react";
import Marquee from "react-fast-marquee";

const HomeBusiness = () => {
  return (
    <div
      className="logos-carousel"
      style={{ marginTop: "2rem", padding: "0 2rem", overflow: "hidden" }}
    >

      <div style={{ marginTop: "6rem" }}>
        <div className="text-center" style={{ fontWeight: "600", fontSize: "32px" }}>
          Trusted by the biggest companies
        </div>

        <div className="text-center" style={{ fontWeight: "400", fontSize: "17px" }}>
          We're not just a service provider; we're your trusted partner, dedicated to understanding and <br /> surpassing your expectations with tailored solutions
        </div>
      </div>

      <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
        <Marquee className="mt-5" gradient={false} style={{ overflow: 'hidden' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((announcementts, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center" style={{ margin: '0 9rem' }}>

              <img
                style={{ maxWidth: "100%", height: "100px", width: "130px", marginRight: "1rem" }}
                src="/logo1.png"
                alt="Logo 1"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HomeBusiness;
