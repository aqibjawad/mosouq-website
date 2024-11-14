import React from "react"

import Marquee from "react-fast-marquee";

import { Row, Col, Container } from "react-bootstrap"

import ReactStars from 'react-stars'

const HomeReview = () => {
    return (
        <div style={{ marginTop: '50px' }}>
          

            <Container fluid className=" px-3 px-md-5" >
            <div>
           <h2 className="">
                Recent Reviews
            </h2>
            <p className="">Hear what our users have to say about us </p>
           </div>
                <Marquee className="mt-5" >
                    {[1, 2, 3, 4, 5, 6, 7].map((announcementts) => (

                        <div class="card my-4 review_card border-0  ms-3" style={{ width: '424px' }}>
                            <div class="card-body">
                                <div className="d-flex">

                                    <div>
                                        <ReactStars
                                            count={5} 
                                            color2="#FFAA00"
                                            value={3} 
                                            size={35} 
                                            edit={false} 
                                        />
                                    </div>
                                </div>
                                <p className="review-descrp">
                                    “Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ”
                                </p>

                                <Row className="mt-5">
                                    <Col lg={9}>
                                        <div className="d-flex">
                                            <img src='/review-person.png' style={{ height: '50px', width: "50px", marginRight: "1rem" }} />
                                            <h5>
                                                Robert Fox
                                            </h5>
                                        </div>

                                        <div style={{ paddingLeft: "4rem", marginTop: "-2rem" }}>
                                            Designation
                                        </div>
                                    </Col>

                                    <Col lg={3}>
                                        <img src="/quote-review.png" />
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    ))}
                </Marquee>
            </Container>
        </div>
    )
}

export default HomeReview