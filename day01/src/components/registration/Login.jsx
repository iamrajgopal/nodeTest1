import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

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
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(formData)
    }

    const userLogin = await fetch('http://localhost:5000/validEmployee/validEmployees', reqOptions);
    try {
      let response = await userLogin.json();
      if (response.status === 'sucess') {
        alert(response.message);
        localStorage.setItem('token',response.token)
        navigate('/dashBoard')
      } else if(response.status === 'wrong') {
        alert(response.message);
      }else if(response.status === 'failed'){
        alert(response.message);
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

let sendTokenToServer = async ()=>{
  let token = localStorage.getItem('token');
  let reqOptions = {
    method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({token})
  }
    if(token){
      let JsonData = await fetch('http://localhost:5000/token/tokenValidation',reqOptions);
      let response = await JsonData.json();
    if(response.status==='success'){
      navigate('/dashBoard')
    }else if(response.status==='unSuccessful'){
      navigate('/');
      alert('Login By Using Valid Credentials')
    }
    console.log(response)
  }else{
    console.log('no token')
  }
}

  useEffect(()=>{
    sendTokenToServer();
  },[])

  return (
    <form onSubmit={onSubmittingUser}>
      <div>
        <label htmlFor='mail'>Email :</label>
        <input ref={emailRef} id='mail' type='email' />
      </div>
      <div>
        <label htmlFor='pass'>Password :</label>
        <input ref={passwordRef} id='pass' type='password' />
      </div>
      <div style={{ paddingTop: '1rem', textAlign: 'right' }}>
        <Button type='submit'>Login</Button>
      </div>
    </form>
  );
}

export default Login;

