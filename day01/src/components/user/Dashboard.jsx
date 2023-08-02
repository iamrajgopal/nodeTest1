import React from 'react'
import { Container,Navbar,Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

function Dashboard() {
  let navigate = useNavigate();

  const userLogout = ()=>{
localStorage.removeItem('token');
navigate('/')
  }
  return (<>
  <Navbar bg='primary' className='App'>
    <Container fluid>
       <Button onClick={userLogout}>LogOut</Button>
    </Container>
   </Navbar>
   <Container>

   </Container>
  </>
    
  )
}

export default Dashboard