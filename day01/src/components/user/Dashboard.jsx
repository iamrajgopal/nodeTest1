import React, { useState } from "react";
import { Container, Navbar, Dropdown,Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Editprofile from "./features/Editprofile";
import Deleteuser from "./features/Deleteuser";
import { AiOutlineMenu } from "react-icons/ai"
import Profilepic from './features/Profilepic'
import Cookies from "js-cookie";

const settings = ["Edit profile", "Dashboard", "Logout",'Delete User',"Profile Pic"];

function Dashboard() {
  const profilePicUrl = localStorage.getItem("profilePicUrl");

  const [compState, setCompState] = useState("");
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  // const [profile,setProfile] = useState('')

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
        case "Profile Pic":
          setCompState("Profile");
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
        case 'Profile':
          return <Profilepic></Profilepic>
      default:
        return null;
    }
  };

  const performLogout = () => {
    alert("User Logged Out Successfully");
    Cookies.remove('token')
    navigate("/");
  };
//   let picture = localStorage.getItem('profilePic');

// let updatingProfilePic = async ()=>{
//   let picture = await localStorage.getItem('profilePic');
//   setProfile(picture)
// };

// useEffect(()=>{
//   updatingProfilePic()
// },[profile])

  

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
          {profilePicUrl && (
        <img
          src={profilePicUrl}
          alt="User Avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
      )}
        </Nav>
        </Container>
      </Navbar>
      <Container>{renderComponents()}</Container>
     {console.log(profilePicUrl,'proooo')}
    </>
  );
}

export default Dashboard;

