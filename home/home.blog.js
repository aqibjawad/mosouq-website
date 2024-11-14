import React from "react";

import { Row, Col, Card, Button } from "react-bootstrap"

const HomeBlog = () => { 
    return (
        <div style={{ marginTop: '7rem', color: 'white', overflow: 'hidden' }}>
            <Row>
                <Col sm={3} className="mt-3" style={{ backgroundColor: '#2D3363', height: '600px', padding:"5rem" }}>
                    <h2 style={{ marginTop: '5rem' }}>
                        What is Lorem Ipsum?
                    </h2> 

                    <div>
                        It is a long established fact that a reader will be distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
                        letters,
                    </div>


                </Col>

                <Col sm={9} style={{ backgroundColor: '#2AD2EC' }} className="mt-3">
                    <Row>
                        {[1, 2, 3].map((announcementts) => (
                            <Col sm="3" className="mt-5 ms-5"style={{}}>
                                <Card style={{ width: '330px', height: '500px', backgroundColor:'lightblue' }}>
                                    <img src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg" style={{ width: '330px', height: "250px", objectFit: 'contain', marginTop: '1rem' }} />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default HomeBlog