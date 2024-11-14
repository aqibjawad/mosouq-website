import React from 'react';
import './index.css';
import { Row, Col } from "react-bootstrap";

const EditUser = () => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};

    return (
        <div className="edit-user-container">
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <Row>
                        <Col lg={4} md={4} sm={6} className="profile-pic-container">
                            <img src="/apple.png" alt="Profile" className="profile-pic" />
                        </Col>
                        <Col className='user-info' lg={8} md={8} sm={6}>
                            <h1>{user.name}</h1>
                            <p>{user.Country}</p>
                        </Col>
                    </Row>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <div className='user-image-remove'>
                                Upload a new Picture
                            </div>
                        </Col>

                        <Col lg={6} md={6} sm={12}>
                            <div className='user-image'>
                                Upload a new Picture
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col lg={6} md={6} sm={12}>
                    <div className='edit-profile-section'>
                        <div className='edit-head'>
                            Personal Setting
                        </div>

                        <div className='edit-form'>
                            <Col>
                                <label className='label-edit' htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className='edit-input mt-3'
                                />
                            </Col>

                            <Col>
                                <label className='label-edit mt-5' htmlFor="name-public">Name (Publically Visible)</label>
                                <input
                                    id="name-public"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="name-public"
                                    placeholder="Name"
                                    className='edit-input mt-3'
                                />
                            </Col>

                            <Col>
                                <label className='label-edit mt-5' htmlFor="country">Country</label>
                                <input
                                    id="country"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    className='edit-input mt-3'
                                />
                            </Col>

                            <Col>
                                <label className='label-edit mt-5' htmlFor="language">Language</label>
                                <input
                                    id="language"
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="language"
                                    placeholder="Language"
                                    className='edit-input mt-3'
                                />
                            </Col>

                            <button className='edit-save-button'>
                                Save Information
                            </button>
                        </div>
                    </div>
                </Col>

                <Col lg={6} md={6} sm={12}>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <div className='logout-section'>
                                <div className='logout-head'>
                                    Logout
                                </div>

                                <div className='logout-descrp'>
                                    Log out wherever you have your Mosoq account open
                                </div>

                                <div className='logout-button'>
                                    Logout
                                </div>
                            </div>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <div className='logout-section'>
                                <div className='logout-head'>
                                    Delete User
                                </div>

                                <div className='logout-descrp'>
                                    When you delete your user profile, your reviews are deleted as well and cannot be restored
                                </div>

                                <div className='delete-button'>
                                    Delete
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default EditUser;
