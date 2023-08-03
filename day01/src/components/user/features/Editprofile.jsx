import React, { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Editprofile() {
    let passRef = useRef();
    let rePassRef = useRef();
    let mobileRef = useRef();
    let formRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let handleChangePassword = async (e) => {
        e.preventDefault();
        let password = passRef.current.value;
        let re_password = rePassRef.current.value;
        let token = localStorage.getItem("token");

        if (password !== re_password) {
            alert("passwords not matched");
        }

        let reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, token }),
        };

        let editProfile = await fetch(
            "http://localhost:5000/Profile/editProfile",
            reqOptions
        );
        let response = await editProfile.json();
        if (response.status === "success") {
            alert(response.message);
            dispatch(logout());
            navigate("/dashBoard");
        } else if (response.status === "error") {
            alert(response.message);
        }
    };

    let handleChangeMobile = async (e) => {
        e.preventDefault();
        let mobile = mobileRef.current.value;
        let token = localStorage.getItem("token");

        let reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile, token }),
        };

        let editMobile = await fetch(
            "http://localhost:5000/Profile/editmobile",
            reqOptions
        );
        let response = await editMobile.json();
        if (response.status === "success") {
            alert(response.message);
            formRef.current.reset();
        } else if (response.status === "error") {
            alert(response.message);
        }
    };

    return (
        <Container>
            <div style={{ textAlign: "center" }}>
                <h5>Edit Profile</h5>
            </div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Change Password</Accordion.Header>
                    <Accordion.Body className="d-flex justify-content-center">
                        <form onSubmit={handleChangePassword}>
                            <div>
                                <label htmlFor="newPass">New Password :</label>
                                <input
                                    id="newPass"
                                    placeholder="Enter New Password"
                                    type="password"
                                    ref={passRef}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="reEnter">Re-Enter Password:</label>
                                <input
                                    id="reEnter"
                                    placeholder="Re-Enter Password"
                                    type="text"
                                    ref={rePassRef}
                                ></input>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Button type="submit" className="mt-2">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update MobileNumber</Accordion.Header>
                    <Accordion.Body className="d-flex justify-content-center">
                        <form onSubmit={handleChangeMobile} ref={formRef}>
                            <div>
                                <label htmlFor="mnum">Enter Mobile Number :</label>
                                <input
                                    id="mnum"
                                    placeholder="Enter number"
                                    type="number"
                                    ref={mobileRef}
                                ></input>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Button type="submit" className="mt-2"> Submit </Button>
                            </div>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default Editprofile;
