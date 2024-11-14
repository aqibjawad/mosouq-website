import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactStars from 'react-stars'; // Import ReactStars
import './index.css';
import { Link } from 'react-router-dom';

const BusinessHeader = () => {
    return (
        <div id="business-header">
            <Row>
                <Col lg={2} md={6} sm={12}>
                    <img className='image-header-business' src="business-image.png" alt="Business Logo" />
                </Col>

                <Col lg={8} md={6} sm={12}>
                    <div className='business-name'>
                        Rehman hotel and restaurant
                    </div>

                    <div className='business-loc'>
                        Chakwal Choa Saidan Shah Pindadan Khan Rd, Pind Dadan Khan, Jhelum, Punjab | Pind Dadan Khan <Link to="#"> Get Directions </Link>
                    </div>

                    <div className=''>
                        {/* Add ReactStars component here */}
                        <ReactStars
                            count={5} // Number of stars to display
                            value={4} // Initial rating value
                            size={24} // Size of the stars
                            color2={'#ffd700'} // Color of the active star
                            edit={false} // Disable editing (read-only)
                        />
                    </div>

                    <div className='read-reviews'>
                        Read Reviews
                    </div>

                    <Row>
                        <Col lg={3} md={3} sm={12}>
                            <div className='button-business'>
                                Phone/Whatsapp
                            </div>
                        </Col>

                        <Col lg={3} md={3} sm={12}>
                            <div className='button-business'>
                                Direction
                            </div>
                        </Col>

                        <Col lg={3} md={3} sm={12}>
                            <div className='button-business'>
                                Website
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default BusinessHeader;
