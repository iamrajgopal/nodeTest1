import React, { useState,useEffect } from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import Useregistratin from "../registration/Useregistratin";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Home() {
  let [compState, setCompState] = useState();
  let navigate = useNavigate();

  const renderComponents = () => {
    switch (compState) {
      case "login/sign":
        return <Useregistratin></Useregistratin>;
      default:
        return;
    }
  };

  let directingToDash = async ()=>{
    let token = Cookies.get("token");
    console.log(token,"this token is from cookies")

    let reqOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             "Authorization":`bearer ${token}` 
        },
        body: JSON.stringify({ token }),
    };

    let directToDashboard = await fetch("http://localhost:5000/dashdirecting/directingToDash",reqOptions);
    let response = await directToDashboard.json();
    if (response.status === "success") {
        navigate('/dashBoard')  
    } else if (response.status === "unSuccessful") {
      navigate('/')
    }
}

useEffect(() => {
  directingToDash();
},[]);

  return (
    <>
      <Navbar bg="primary" className="App">
        <Container fluid>
          <Button
            onClick={() => {
              setCompState("login/sign");
            }}
          >
            Login/signup
          </Button>
        </Container>
      </Navbar>
      <Container fluid>
        {renderComponents()}
      </Container>
    </>
  );
}

export default Home;

// let [compState, setCompState] = useState();
//   let negRef = useRef();
//   const [count, setCount] = useState(1);

//   const [posValue, setPosValue] = useState("");
//   const handleInputChangePositive = (event) => {
//     const value = event.target.value;

//     if (value === "" || /^\d*(\.\d{0,2})?$/.test(value)) {
//       if (value.startsWith(".")) {
//         setPosValue("0" + value);
//       } else {
//         setPosValue(value);
//       }
//     }
//   };

//   const [negValue, setNegValue] = useState("");
//   const handleInputChangeNegative = (event) => {
//     const value = event.target.value;

//     if (value === "" || value === "0" || value === "-") {
//       setNegValue(value);
//     } else if (
//       /^(-)?((0(\.\d{0,3})?)|(\.\d{0,3})|(\d+(\.\d{0,3})?))?$/.test(value)
//     ) {
//       if (value === "0.0" || value === "-0.0" || value === "-0.00") {
//         setNegValue("-" + value.substring(1));
//       } else if (value === "0." || value === "." || value === "-.") {
//         setNegValue("-0.");
//       } else if (parseFloat(value) === 0) {
//         setNegValue("0");
//       } else {
//         const newValue = value.startsWith("-") ? value : "-" + value;
//         setNegValue(newValue);
//       }
//     }
//   };

//   <form>
//           <label htmlFor="neg">Only Negative</label>
//           <input
//             id="neg"
//             type="text"
//             value={negValue}
//             onChange={handleInputChangeNegative}
//             ref={negRef}
//           />
//         </form>

//         <form>
//           <label htmlFor="pos">Only Positive</label>
//           <input
//             id="pos"
//             type="text"
//             value={posValue}
//             onChange={handleInputChangePositive}
//           />
     