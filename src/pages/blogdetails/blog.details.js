import React from "react";

const BlogSection = ({ dealData }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        className="w-full h-64 object-cover rounded-lg mb-6"
        src={dealData.deal_image}
        alt={dealData.name}
      />

      <h1 className="text-3xl font-bold mb-4">{dealData.name}</h1>

      <p className="text-gray-700 mb-6">{dealData.description}</p>

    </div>
  );
};

export default BlogSection;
