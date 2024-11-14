import React from "react";

import DealsHeader from "./dubai.header"
import DealCards from "./dubai.cards";
import DealSearch from "./dubai.search";

import { Row, Col, Container } from "react-bootstrap";

const Deals =()=>{
    return(
        <div>
            <DealsHeader/>

            <div style={{marginTop:"5rem", marginLeft:"4rem", marginRight:"4rem", marginBottom:"7rem"}}>
                <Row>
                    <Col lg={3}>
                        <DealSearch />
                    </Col>
 
                    <Col lg={9}>
                        <DealCards />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default Deals