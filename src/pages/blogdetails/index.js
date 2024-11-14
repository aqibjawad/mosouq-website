import React from "react";

import { Row, Col } from "react-bootstrap"

import BlogSection from "./blog.details";

import HomeDeals from "../home/home.deals";

const BlogDetails = () => {
    return (
        <div>
            <div style={{ marginTop: "10rem", marginLeft: "4rem", marginRight: "4rem" }}>
                <div style={{ fontWeight: "700", fontSize: "64px", textAlign: "center" }}>
                    Jumeriah Beach: e& Beach Canteen
                </div>

                <div style={{ fontWeight: "400", fontSize: "24px", color: "#454545", textAlign: "center" }}>
                    Great daily deals, disuiunts and offeres with Mosouq
                </div>

                <Row>
                    <Col className="mt-5 mb-5" lg={6} md={6} sm={12}>
                        <BlogSection />
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                        <img src="/blog deals page.jpg" style={{marginTop:"2rem", width:"100%"}} />
                    </Col>
                </Row>

            </div>
            <HomeDeals />
        </div>

    )
}

export default BlogDetails;