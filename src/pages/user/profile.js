import React from 'react';
import Profile from './profile.header';

import Review from './user.review';
import Notification from './user.notification';
import Verification from './user.verification';
import SocialSettings from './user.social';

import { Row, Col } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <div style={{ overflowX: "hidden", marginLeft: "3rem", marginRight: "3rem" }}>
      <Profile />

      <div className="content">

        <Row className='mt-5'>
          <Col lg={6} sm={12} md={6}>
            <Review />
          </Col>
          <Col lg={6} sm={12} md={6}>
            <Notification />
          </Col>
        </Row>

        <Row className='mt-5 mb-5'>
          <Col lg={6} sm={12} md={6}>
            <Verification />
          </Col>

          <Col lg={6} sm={12} md={6}>
            <SocialSettings />
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default UserProfile;
