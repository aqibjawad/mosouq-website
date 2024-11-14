import React from "react";

import {Row, Col, Container} from "react-bootstrap"

import "./index.css"

const BlogHead =()=>{
    return(
        <div>
         
          <Row className=" g-5 align-items-center"> 
                <Col lg={6} md={6} sm={12}>

                <div className=" d-flex  pb-2 gap-3">
                    <p style={{backgroundColor:'#DEE2E7'}} className=" m-0 py-1 px-3 rounded-2">Health</p>
                    <p style={{backgroundColor:'#DEE2E7'}} className=" m-0 py-1 px-3 rounded-2">Care</p>
                </div>
                    <div className="blog-head">
                        The Best spa saloon for your
                        relasxtions?
                    </div>
                    
                    <div className="blog-descrp py-3">
                        Lorem ipsum dolor sit amet, consectetur em adipiscing  elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet consectetur em adipiscing elit,
                    </div>


                    <button className=" py-3  px-5 rounded-3 bg-white text-black border  ">Read More</button>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <img className="blog-head-image" src="/blog-head.png" />
                </Col>
            </Row>
    
        </div>
    )
}

export default BlogHead;