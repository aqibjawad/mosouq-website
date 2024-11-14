import React, { useState } from "react";
import "./index.css";

import {Row, Col} from "react-bootstrap"

const DealSearch = () => {
  const [emirates, setEmirates] = useState({
    "Abu Dhabi": false,
    Dubai: false,
    Sharjah: false,
    Ajman: true,
    Fujairah: false,
    "Ras al-khaimah": false,
  });
  const [pricing, setPricing] = useState({ min: 90, max: 180 });
  const [discount, setDiscount] = useState(45);
  const [sortLowToHigh, setSortLowToHigh] = useState(true);

  const handleEmiratesChange = (emirate) => {
    setEmirates((prev) => ({ ...prev, [emirate]: !prev[emirate] }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleSortChange = () => {
    setSortLowToHigh(!sortLowToHigh);
  };

  const resetFilters = () => {
    setEmirates({
      "Abu Dhabi": false,
      Dubai: false,
      Sharjah: false,
      Ajman: true,
      Fujairah: false,
      "Ras al-khaimah": false,
    });
    setPricing({ min: 90, max: 180 });
    setDiscount(45);
    setSortLowToHigh(true);
  };

  return (
    <div className="filter-card">
      <div className="filter-header">
        <h3>Filter</h3>
        <button onClick={resetFilters}>Reset</button>
      </div>
      <div className="filter-section">
        <div style={{ fontWeight: "600", fontSize: "16px" }}>Emirates</div>

        {Object.keys(emirates).map((emirate) => (
          <div key={emirate} className="emirate-row">
            <label>
              <input
                type="checkbox"
                checked={emirates[emirate]}
                onChange={() => handleEmiratesChange(emirate)}
              />
              {emirate}
            </label>
          </div>
        ))}

      </div>

      {/* <div>

        <div style={{ fontWeight: '600', fontSize: '16px', color: '#000000B2' }}>Pricing</div>

        <Row>
          <Col lg={6} style={{Width:"125px", height:"48px", borderRadius:'4.7px', border: "0.94px solid #F1F1F"}}>
            <input
              type="number"
              name="min"
              value={pricing.min}
              onChange={handlePricingChange}
            />
            -
          </Col>

          <Col lg={6}>
            <input
              type="number"
              name="max"
              value={pricing.max}
              onChange={handlePricingChange}
            />
            AED
          </Col>
        </Row>
      </div> */}

      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={sortLowToHigh}
            onChange={handleSortChange}
          />
          Show from low to high
        </label>
      </div>
    </div>
  );
};

export default DealSearch;
