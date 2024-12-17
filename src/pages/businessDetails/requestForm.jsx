import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RequestForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    userName: "",
    userEmail: "",
    userPhone: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setFormData((prev) => ({
        ...prev,
        userName: userData.name || "",
        userEmail: userData.email || "",
        userPhone: userData.phone || "",
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Form submitted:", formData);
    handleClose?.();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Request Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        <div className="border rounded p-3 mb-4 bg-light">
          <h6 className="text-primary mb-3">User Information</h6>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              readOnly
              className="bg-white border-secondary"
              style={{ fontWeight: "500" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="userEmail"
              value={formData.userEmail}
              readOnly
              className="bg-white border-secondary"
              style={{ fontWeight: "500" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="userPhone"
              value={formData.userPhone}
              readOnly
              className="bg-white border-secondary"
              style={{ fontWeight: "500" }}
            />
          </Form.Group>
        </div>

        <div className="border rounded p-3">
          <h6 className="text-primary mb-3">Schedule Information</h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Select Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Select Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="border-secondary"
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestForm;
