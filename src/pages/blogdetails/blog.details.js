import React from "react";

import "./index.css";

const BlogSection = ({ dealData }) => {
  return (
    <div>
      <img className="image-blog-details" src={dealData.deal_image} />

      <div className="blog-detail-head">{dealData.name}</div>

      <div className="blog-detail-descrp">{dealData.description}</div>
    </div>
  );
};

export default BlogSection;
