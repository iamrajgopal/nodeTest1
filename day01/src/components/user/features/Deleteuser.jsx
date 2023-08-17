import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

function Deleteuser() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let deletingAccount = async ()=>{
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

        let deleteAccount = await fetch(
            "http://localhost:5000/Profile/deleteAccount",
            reqOptions
        );
        let response = await deleteAccount.json();
        if (response.status === "success") {
            alert(response.message);
            dispatch(logout())
            navigate('/dashBoard')
            
        } else if (response.status === "error") {
            alert(response.message);
        }else if(response.status === "wrong user"){
          alert(response.message)
        }
    }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header style={{color:'red'}}>
          <Modal.Title variant="primary">Delete Account</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:'orange', height:'auto',textAlign:'center'}}>
          <p style={{color:'white'}}>Do You Really Want To Delete Your Account ?</p>
          <p style={{color:'white'}}>Deleting Your Account And All Its Data Cannot Be Undone So make Sure</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success">Abort</Button>
          <Button variant="danger" onClick={deletingAccount}>Delete Account</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Deleteuser;