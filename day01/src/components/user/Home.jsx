import React, { useState, useRef } from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Useregistratin from "../registration/Useregistratin";
import Editprofile from "./features/Editprofile";

function Home() {
  let [compState, setCompState] = useState();
  let negRef = useRef();
  const [count, setCount] = useState(1);

  const [posValue, setPosValue] = useState("");

  // const handleInputChangePositive = (event) => {
  //   const value = event.target.value;
  //   if (value === "" || /^\d+(\.\d{0,2    })?$/.test(value)) {
  //     setPosValue(value);
  //   }
  // };

  const handleInputChangePositive = (event) => {
    const value = event.target.value;

    if (value === "" || /^\d*(\.\d{0,2})?$/.test(value)) {
      if (value.startsWith(".")) {
        setPosValue("0" + value);
      } else {
        setPosValue(value);
      }
    }
  };

  const [negValue, setNegValue] = useState("");

  // const handleInputChangeNegative = (event) => {
  //   const value = event.target.value;

  //   if (value === '' || value === '0' || value === '-') {
  //     setNegValue(value);
  //   } else if (/^(-)?((0(\.\d{0,3})?)|(\.\d{0,3})|(\d+(\.\d{0,3})?))?$/.test(value)) {
  //     if (value === '0.') {
  //       setNegValue('-0.');
  //     } else if (value.startsWith('.')) {
  //       setNegValue('-0' + value);
  //     } else if (parseFloat(value) === 0) {
  //       setNegValue('0');
  //     } else {
  //       const newValue = value.startsWith('-') ? value : '-' + value;
  //       setNegValue(newValue);
  //     }
  //   }
  // }

  // const handleInputChangeNegative = (event) => {
  //   const value = event.target.value;

  //   if (value === '' || value === '0' || value === '-') {
  //     setNegValue(value);
  //   } else if (/^(-)?((0(\.\d{0,3})?)|(\.\d{0,3})|(\d+(\.\d{0,3})?))?$/.test(value)) {
  //     if (value === '0.' || value === '0.0' || value === '-0.0') {
  //       setNegValue('-' + value.substring(1));
  //     } else if (value.startsWith('.')) {
  //       setNegValue('-0' + value);
  //     } else if (parseFloat(value) === 0) {
  //       setNegValue('0');
  //     } else {
  //       const newValue = value.startsWith('-') ? value : '-' + value;
  //       setNegValue(newValue);
  //     }
  //   }
  // };

  const handleInputChangeNegative = (event) => {
    const value = event.target.value;

    if (value === "" || value === "0" || value === "-") {
      setNegValue(value);
    } else if (
      /^(-)?((0(\.\d{0,3})?)|(\.\d{0,3})|(\d+(\.\d{0,3})?))?$/.test(value)
    ) {
      if (value === "0.0" || value === "-0.0" || value === "-0.00") {
        setNegValue("-" + value.substring(1));
      } else if (value === "0." || value === "." || value === "-.") {
        setNegValue("-0.");
      } else if (parseFloat(value) === 0) {
        setNegValue("0");
      } else {
        const newValue = value.startsWith("-") ? value : "-" + value;
        setNegValue(newValue);
      }
    }
  };

  const renderComponents = () => {
    switch (compState) {
      case "login/sign":
        return <Useregistratin></Useregistratin>;
      default:
        return;
    }
  };

  let countingAddition = () => {
    setCount((prevState) => prevState + 1);
  };

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
        <form>
          <label htmlFor="neg">Only Negative</label>
          <input
            id="neg"
            type="text"
            value={negValue}
            onChange={handleInputChangeNegative}
            ref={negRef}
          />
        </form>

        <form>
          <label htmlFor="pos">Only Positive</label>
          <input
            id="pos"
            type="text"
            value={posValue}
            onChange={handleInputChangePositive}
          />
        </form>
        <p>Count :{count}</p>
        <Button onClick={countingAddition}> add</Button>
        {renderComponents()}
      </Container>
    </>
  );
}

export default Home;

// const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (event) => {
//     const value = event.target.value;

//     if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
//       setInputValue(value);
//     }
//   };

//   <form>
//       <label htmlFor='pos'>Only Positive</label>
//       <input
//         id='pos'
//         type='text'
//         value={inputValue}
//         onChange={handleInputChange}
//       />
//     </form>
