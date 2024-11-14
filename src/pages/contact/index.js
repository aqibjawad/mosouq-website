import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaEnvelope, FaUser, FaPen } from 'react-icons/fa';

import HomePartners from "../home/home.partners";
import HomeReview from "../home/home.reviews";



import "./index.css"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="" style={{marginTop:'5rem'}}>
            <div className="" style={{backgroundColor:'#F0F1F5', height:"400px"}}>
                test
            </div>
            <Container>
                <Row>
                    <Col sm="6">
                        <h2>Contact Us</h2>
                        <Form onSubmit={handleSubmit} className="contact-form">
                            <Form.Group controlId="formBasicName">
                                <Form.Label><FaUser /> Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label><FaEnvelope /> Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicMessage">
                                <Form.Label><FaPen /> Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                />
                            </Form.Group>

                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </Form>
                    </Col>

                </Row>
            </Container>

            <div>
                <HomePartners />
                <HomeReview />
            </div>
        </div>
    );
};

export default Contact;
