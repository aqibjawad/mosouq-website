import React from 'react';
import './footer.desktop.css';

import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { Row, Col, Container } from "react-bootstrap"


const Footer = () => {
    return (
        <div className="footer" >
            <div className='py-3 px-3 px-md-5' >
                <Container fluid >
                <Row className=' g-4'>
                    <Col lg={4} md={6} sm={12}>
                        <Row>
                           

                            <Col lg={10} md={10} sm={10}>
                            {/* <img src="/footer-logo.png" style={{ width: "195px", height: "56px" }} /> */}
                            <div className="logo">
          <div className="mosouq-logo text-white"> Mosouq </div>
        </div>
                                <div className=' mt-3' style={{ textAlign: "justify", fontSize: "16px", color: "#DCDCDCCC" }}>
                                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                                    duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                </div>
                            </Col>

                            <Col className='footer-social-icons mt-5' lg={12} md={12} sm={12}>
                                <a href="#"> <FaXTwitter /> </a>
                                <a href="#"><FaFacebookF />
                                </a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </Col>
                        </Row>
                    </Col>

                    <Col className='footer-column' lg={2} md={3} sm={12}>
                        <h3>About</h3>
                        <div>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/error">Jobs</a></li>
                                <li><a href="/error">Contact</a></li>
                                <li><a href="/error">Blog</a></li>
                                <li><a href="/error">How Mosouq works</a></li>
                                <li><a href="/error">Press</a></li>
                                <li><a href="/error">Investor Relations</a></li>
                            </ul>
                        </div>
                    </Col>

                    <Col className='footer-column' lg={3} md={3} sm={12}>
                        <h3>Community</h3>
                        <div>
                            <ul>
                                <li><a href="/error">Trust in reviews</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/error">Help Center</a></li>
                                <li><a href="sign-up">Sign up</a></li>
                                <li><a href="/error">Chrome App</a></li>
                            </ul>
                        </div>
                    </Col>

                    <Col className='footer-column' lg={3} md={3} sm={12}>
                        <h3>Businesses</h3>
                        <div>
                            <ul>
                                <li><a href="/business-signup">Mosouq Business</a></li>
                                <li><a href="/error">Products</a></li>
                                <li><a href="/error">Plans & Pricing</a></li>
                                <li><a href="/error">Business Login</a></li>
                                <li><a href="/error">Blog for Business</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                </Container>

            </div>
          <div className='footer-bottom py-3 px-3 px-md-5'>
            <Container fluid >
                    <ul className='p-0'>
                        <li><a href="#">Legal</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Guidelines for Reviewers</a></li>
                        <li><a href="#">System status</a></li>
                        <li><a href="#">Modern Slavery Statement</a></li>
                        <li className=''> <p className='all_right pt-3'>All rights reserved © 2024 - 2030</p></li>

                    </ul>
                   
                </Container>
                </div>
        </div>

    );
};

export default Footer;
