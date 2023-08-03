import React,{useState} from 'react';
import {Navbar,Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Useregistratin from '../registration/Useregistratin';
import Editprofile from './features/Editprofile';


function Home() {
  let [compState,setCompState] = useState();


const  renderComponents = ()=>{
  switch (compState){
    case 'login/sign':
      return <Useregistratin></Useregistratin>
      default:
        return ;
  }
 }

  return (
    <>
     <Navbar bg='primary' className='App'>
        <Container fluid>
           <Button onClick={()=>{setCompState('login/sign')}}>Login/signup</Button>
        </Container>
     </Navbar>
     <Container fluid>
      {renderComponents()}
      </Container>
    </>
  )
}

export default Home