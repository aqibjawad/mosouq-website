import React from 'react';
import './index.css';
import { Row, Col } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";

import { Link } from'react-router-dom';

function Profile() {

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  return (
    <div className="profile">
      <Row style={{ marginTop: "10rem" }}>
        <Col lg={6} md={6} sm={12}>
          <Row>
            <Col lg={4} md={4} sm={6} className="profile-pic-container">
              <img src="/apple.png" alt="Profile" className="profile-pic" />
              <div className="edit-icon">
                <Link to={`/edit-user/${user._id}`}>
                  <CiEdit />
                </Link>
              </div>
            </Col>
            <Col lg={8} md={8} sm={6}>
              <h1>{user.name}</h1>
              <p>{user.Country}</p>
            </Col>
          </Row>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <div className="stats">
            <div><strong>5</strong> Reviews</div>
            <div><strong>20+</strong> Reads</div>
            <div><strong>0</strong> Useful</div>
          </div>
          <div className="written-by-you">
            Review(s) written by you
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
