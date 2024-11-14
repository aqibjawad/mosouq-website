import React, {useState, useEffect} from 'react';
import './index.css';
import { Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "./index.css"

import { GET } from "../src/apicontrollers/apiController"

const ExploreDubai = () => {

    const [dubai, setDubai] = useState([]);

    const fetchData = async () => {
        GET("dubai/get-dubai").then((result) => {
            setDubai(result);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="carousel-container" style={{marginBottom:"7rem"}}>
            <Row className="justify-content-between mt-5" style={{ marginLeft: '3rem' }}>
                <Col sm="6" className="">
                    <h2>
                        Explore Dubai 
                    </h2>
                    <p>
                        Hear what our users have to say about us
                    </p>
                </Col>

                <Col sm="auto" style={{ marginRight: '4rem' }}>
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px 20px',
                            fontSize: '14px',
                            color: 'white',
                            backgroundColor: '#404EED',
                            borderRadius: '62px',
                            textDecoration: 'none',
                            textAlign: 'center',
                            width: '135px',
                            height: '49px',
                            border: '1px solid #0000004D',
                        }}
                    >
                        View All
                    </Link>
                </Col>
            </Row>

            <div className='' style={{marginLeft:"3rem", marginRight:"3rem"}}>
                <div className="image-row">
                    {dubai.map((dubaii, index) => (
                        <div key={index} className="image-container">
                            <img src={dubaii.dubai_image} alt={`Background ${index + 1}`} style={{width:"320px", height:"550px"}} />
                            <div className="overlay">
                                <div style={{ fontWeight: "600", fontSize: "32px", color:"black" }}> {dubai.name} </div>
                                <div style={{ fontWeight: "500", fontSize: "16px" }}>
                                   {dubai.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreDubai;
