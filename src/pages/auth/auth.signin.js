import React, { useRef, useState } from "react";

import { Auth } from "../../context/auth.context";

import { toast } from "react-toastify";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";
import GoogleSignin from "../../components/google/googleSignin";

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  let navigation = useNavigate();

  const auth = Auth();

  const submit = async (e) => {
    e.preventDefault();
    let check = 0;

    emailRef?.current?.value?.length === 0 && check++;
    passwordRef?.current?.value?.length === 0 && check++;

    if (check > 0) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const result = await axios.post(
        `https://apis.mosouq.ae/api/user/login-user`,
        formData
      );
      // const result = await axios.post(
      //   `http://localhost:5000/api/user/login-user`,
      //   formData
      // );
      if (check === 0) {
        auth.activateToken(localStorage.setItem("token", result.data.token));
        console.log(auth.activateToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        auth.activateAuthentication(true);
        toast.success("Login Successfull! ");
        navigation("/user-profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div id="signin" className=" pt-5 mt-4">
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
                    <h1 className="">Sign Up for Mosouq</h1>
                    <p className=" fs-5">
                      Lorem ipsum dolor sit amet consectetur. Mi ipsum diam
                    </p>
                  </div>
                  <div className=" mt-5 pt-3 mx-5">
                    <img src="/login.png" alt="blog" className=" w-100" />
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
              <h2 className="text-center">Sign In for Mosoq.</h2>
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
                    {/* <img
                      src="/Social media logo.png"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />{" "}
                    Continue with Google */}
                    <GoogleSignin />
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
                      src="/linkedin.webp"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />{" "}
                    Continue with Linkedin
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

              <form>
                <Row className=" g-4">
                  <Col lg={12}>
                    <div>
                      <label className=" mb-1">Email Address</label>
                      <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <label className=" mb-1">Password</label>
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      placeholder=""
                    />
                  </Col>
                  <Col lg={12}>
                    <div className=" d-flex gap-2  align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="terms"
                      />
                      <label
                        className="form-check-label pt-2"
                        htmlFor="flexCheckDefault"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Remember me
                      </label>
                    </div>
                  </Col>
                </Row>

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
                  onClick={submit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className=" text-center">
                  <p className=" m-0 pt-2">
                    Did you have an Account?{" "}
                    <Link to={"/sign-up"} className=" text-black fs-6">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
