import React, { useState } from "react";
import { Container, Navbar, Dropdown,Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Editprofile from "./features/Editprofile";
import Deleteuser from "./features/Deleteuser";
import { AiOutlineMenu } from "react-icons/ai"
import Profilepic from './features/Profilepic'

const settings = ["Edit profile", "Dashboard", "Logout",'Delete User'];

function Dashboard() {
  const [compState, setCompState] = useState("");
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (file) => {
    setProfilePic(URL.createObjectURL(file));
    
  };

  const handleToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMenuItemClick = (setting) => {
    switch (setting) {
      case "Edit profile":
        setCompState("editProfile");
        break;
      case "Dashboard":
        setCompState("dashboard");
        break;
      case "Logout":
        performLogout();
        break;
        case "Delete User":
          setCompState("Delete")
        break;
      default:
        setCompState("");
        break;
    }
    setShowUserMenu(false);
  };

  const renderSettings = settings.map((setting, index) => (
    <Dropdown.Item key={index} onClick={() => handleMenuItemClick(setting)}>
      {setting}
    </Dropdown.Item>
  ));

  const renderComponents = () => {
    switch (compState) {
      case "editProfile":
        return <Editprofile />;
      case "dashboard":
        // Implement logic for rendering dashboard
        return <div>Dashboard Content</div>;
        case "Delete": 
        return <Deleteuser></Deleteuser>
      default:
        return null;
    }
  };

  const performLogout = () => {
    alert("User Logged Out Successfully");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" expand="xs" className="bg-body-tertiary">
        <Container fluid>
          <Dropdown
            show={showUserMenu}
            onToggle={handleToggleUserMenu}
            drop="down"
            align='start'
          >
            <Dropdown.Toggle
              variant="success"
              id="user-dropdown"
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
            >
         
         <AiOutlineMenu style={{color: 'red'}} size={'20px'}></AiOutlineMenu>
            </Dropdown.Toggle>
            {/* Render the dropdown menu */}
            <Dropdown.Menu>{renderSettings}</Dropdown.Menu>
          </Dropdown>
          <Nav>
          {profilePic ? (
            <img
              src={profilePic}
              alt="User Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ) : (
            <Profilepic onProfilePicChange={handleProfilePicChange} />
          )}
        </Nav>
        </Container>
      </Navbar>
      <Container>{renderComponents()}</Container>
      {console.log(profilePic,'fromprofile')}
    </>
  );
}

export default Dashboard;

