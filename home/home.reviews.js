import React from "react"

import Marquee from "react-fast-marquee";

import { Row, Col } from "react-bootstrap"

import ReactStars from 'react-stars'

const HomeReview = () => {
    return (
        <div style={{ marginTop: '50px' }}>
            <h2 className="text-center">
                Recent Reviews
            </h2>

            <div style={{marginRight:"4rem", marginLeft:"4rem"}}>
                <Marquee className="mt-5" >
                    {[1, 2, 3, 4, 5, 6, 7].map((announcementts) => (

                        <div class="card ms-3" style={{ width: '424px' }}>
                            <div class="card-body">
                                <div className="d-flex">

                                    <div>
                                        <ReactStars
                                            count={5} // Static number of stars
                                            value={3} // Static rating value
                                            size={35} // Size of the stars
                                            edit={false} // Disable editing
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
            </div>
        </div>
    )
}

export default HomeReview