import React from "react";

import DealsHeader from "./deals.header"
import DealCards from "./deals.cards";
import DealSearch from "./deals.search";

import { Row, Col, Container } from "react-bootstrap";

const Deals =()=>{
    return(
        <div>
            <DealsHeader/>

            <div style={{marginTop:"5rem", marginLeft:"4rem", marginRight:"4rem", marginBottom:"7rem"}}>
                <Row>
                    {/* <Col lg={3}>
                        <DealSearch />
                    </Col> */}
 
                    <Col lg={12}>
                        <DealCards />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default Deals