import React, { useEffect,useState } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Editprofile from "./features/Editprofile";
import Deleteuser from "./features/Deleteuser";

function Dashboard() {
  
  let [compState,setCompState] = useState('')

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let log = useSelector((store) => store.auth.isAuthenticated);

  useEffect(() => {
    if (!log) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [log, navigate]);

let renderComponents = ()=>{
  switch (compState) {
    case 'editProfile':
      return <Editprofile></Editprofile>
    case 'settings':
      return;
      case 'delete':
      return <Deleteuser></Deleteuser>
    default:
      return;
  }

}

  return (
    <>
      <Navbar bg="primary" expand="xs" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              className="me-auto my-3 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Item className="navItem" onClick={()=>setCompState('dash')}>Home</Nav.Item>
              <Nav.Item className="navItem" onClick={() => dispatch(logout())}>LogOut</Nav.Item>
              <Nav.Item className="navItem" onClick={()=>setCompState('editProfile')}>Edit Profile</Nav.Item>
              <Nav.Item className="navItem" onClick={()=>setCompState('settings')}>Settings</Nav.Item>
              <Nav.Item className="navItem" onClick={()=>setCompState('delete')}>Delete Account</Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
         {renderComponents()}
      </Container>
    </>
  );
}

export default Dashboard;
