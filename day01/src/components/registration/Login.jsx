import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  let navigate = useNavigate();


  let onSubmittingUser = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    let reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const userLogin = await fetch(
      "http://localhost:5000/validEmployee/validEmployees",
      reqOptions
    );
    try {
      let response = await userLogin.json();
      if (response.status === "success") {
        alert(response.message);
        // localStorage.setItem("token", response.token);
        Cookies.set("token", response.token);
        // Cookies.set("refreshToken", response.ref_token);

        navigate("/dashBoard");
      } else if (response.status === "wrong") {
        alert(response.message);
      } else if (response.status === "failed") {
        alert(response.message);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  let sendTokenToServer = async () => {
    let token = localStorage.getItem("token");
    let refreshToken = Cookies.get('refreshToken');
    console.log(refreshToken,'refresh token')
try {
  if (!token && refreshToken) {
    let reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    };
    let JsonData = await fetch(
      "http://localhost:5000/token/tokenValidation",
      reqOptions
    );
    let response = await JsonData.json();
    if (response.status === "success") {
      
      localStorage.setItem("token", response.token);
      navigate("/dashBoard");
    } else if (response.status === "unSuccessful") {
      navigate("/");
      alert("Login By Using Valid Credentials");
    }
  } 
  else if (!token && !refreshToken) {
    navigate("/");
  }else if(token && refreshToken){
    navigate('/dashboard')
  }
  
} catch (error) {
  console.log('Error Occured : ',error)
}    
  };



  useEffect(() => {
    sendTokenToServer();
  },[]);

  return (
    <form onSubmit={onSubmittingUser}>
      <div>
        <label htmlFor="mail">Email :</label>
        <input ref={emailRef} id="mail" type="email" />
      </div>
      <div>
        <label htmlFor="pass">Password :</label>
        <input ref={passwordRef} id="pass" type="password" />
      </div>
      <div style={{ paddingTop: "1rem", textAlign: "right" }}>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}

export default Login;
