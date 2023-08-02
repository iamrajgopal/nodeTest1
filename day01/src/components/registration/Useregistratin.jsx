import {Tab,Tabs,Container} from 'react-bootstrap';
import Signup1 from './Signup';
import Login from './Login';

function Useregistratin() {
  return (
    <Container>
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill 
    >
      <Tab eventKey="home" title="Signup" >
        <Signup1></Signup1>
      </Tab>
      <Tab eventKey="profile" title="Login">
        <Login></Login>
      </Tab>
    </Tabs>
    </Container>
  );
}

export default Useregistratin; 