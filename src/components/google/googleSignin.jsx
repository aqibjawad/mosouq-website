import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { Auth } from "../../context/auth.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleSignin = () => {
  const auth = Auth();
  let navigation = useNavigate();

  const handleGoogleLogin = async (googleToken) => {
    try {
      const formData = {
        googleToken,
      };
      const result = await axios.post(
        `https://apis.mosouq.ae/api/user/googleLogin-user`,
        formData
      );
      auth.activateToken(localStorage.setItem("token", result.data.token));
      console.log(auth.activateToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      auth.activateAuthentication(true);
      toast.success("Login Successfull! ");
      navigation("/user-profile");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="1070432111681-bb94ueqadc0kccu1474tkqhqtgnfcf94.apps.googleusercontent.com">
        <GoogleLogin
          buttonText="Login with Google"
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          }}
          onFailure={() => {
            toast.error("Login Failed");
          }}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignin;
