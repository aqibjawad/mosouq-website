import React, { useState } from "react";
import "./auth.css";
import { Row, Col, Container } from "react-bootstrap";
import { POST } from "../../apicontrollers/apiController";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    terms: false,
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      role: "user",
    };
    setIsLoading(true);
    try {
      const response = await POST("user/add-user", dataToSend);
      toast("Your Account Successfully Created");
      navigation("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="signup" className="  pt-5">
      <Container fluid className=" px-3 py-5  mt-5 px-md-5">
        <Row>
          <Col
            lg={6}
            md={6}
            sm={12}
            className="d-flex  mt-5  align-items-center"
          >
            <Row>
              <Col lg={12}>
                <div>
                  <div>
                    <h1>Sign Up for Mosouq</h1>
                    <p className=" fs-5">
                      Lorem ipsum dolor sit amet consectetur. Mi ipsum diam{" "}
                    </p>
                  </div>
                  <div className=" mt-5 pt-3 mx-5">
                    <img src="/Login.png" alt="blog" />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <div
              className=" p-4  shadow-sm rounded-3"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <h2 className="text-center">Sign Up for Mosoq.</h2>
              <h6 className="text-center fs-6">Connect with businesses</h6>

              <Row className=" pt-4">
                <Col lg={12}>
                  <button
                    className="social-button  w-100 rounded-2 google"
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #CECECE",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src="/Social media logo.png"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />{" "}
                    Continue with Google
                  </button>
                </Col>
                <Col lg={12}>
                  <button
                    className="social-button w-100 rounded-2 apple"
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #CECECE",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src="/apple.png"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />{" "}
                    Continue with Apple
                  </button>
                </Col>
              </Row>

              <Row className="align-items-center my-3">
                <Col xs={5}>
                  <hr />
                </Col>
                <Col xs={2} className="text-center">
                  OR
                </Col>
                <Col xs={5}>
                  <hr />
                </Col>
              </Row>

              <form onSubmit={handleSubmit}>
                <Row className=" g-4">
                  <Col lg={6}>
                    <div>
                      <label className=" fs-6 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder=""
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div>
                      <label className=" fs-6 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        placeholder=""
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div>
                      <label className=" fs-6 mb-1">Email Address</label>
                      <input
                        className="emailaddress"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>

                  <Col xs={12} sm={6}>
                    <div>
                      <label className=" fs-6 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div>
                      <label className=" fs-6 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>

                  <Col xs={12} sm={12}>
                    <label className=" fs-6 mb-1">Password</label>
                    <input
                      className="emailaddress"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />{" "}
                  </Col>
                  <Col lg={12}>
                    <div className=" d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="flexCheckDefault"
                        style={{ fontSize: "1rem" }}
                      >
                        By creating an account, I agree to our{" "}
                        <Link>Terms of use and Privacy Policy</Link>
                      </label>
                    </div>
                  </Col>
                </Row>

                <div className="text-center">
                  <button
                    type="submit"
                    style={{
                      marginTop: "1rem",
                      borderRadius: "40px",
                      color: "white",
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "#404EED",
                      border: "none",
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                    {isLoading ? "Creating Account..." : "Create Free Account"}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;
