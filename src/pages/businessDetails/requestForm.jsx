import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { POST } from "../../apicontrollers/apiController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RequestForm = ({ show, handleRequestModalClose, businessData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    businessId: "",
    userId: "",
    phone: "",
    userName: "",
    userEmail: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      userId: userData._id,
      phone: userData.phone,
      businessId: businessData?._id,
      userName: userData.name,
      userEmail: userData.email,
    }));
  }, [businessData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await POST("requestForm/create-form", formData);
      toast.success("Your request has been submitted successfully");
      handleRequestModalClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleRequestModalClose} centered>
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
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border-secondary"
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
        <Button variant="secondary" onClick={handleRequestModalClose}>
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