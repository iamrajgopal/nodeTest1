import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/user/Home';
import Dashboard from './components/user/Dashboard';
import Useregistratin from './components/registration/Useregistratin';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/userRegistration' element={<Useregistratin/>}></Route>
    <Route path='/dashBoard' element={<Dashboard/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
