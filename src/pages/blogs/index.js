import React from "react";

import BlogHead from "./blog.head";
import BlogCards from "./blogs.cards";
import { Container } from "react-bootstrap";

const Blog = () => {
  return (
    <div className="main-blog">
      <Container fluid className=" px-3 px-md-5">
        <BlogHead />

        <BlogCards />
      </Container>
    </div>
  );
};

export default Blog;
