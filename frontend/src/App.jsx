import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar"
import Home from './pages/Home';
import Login from './components/loginRegister/Login';
import Register from './components/loginRegister/Register';
import ResetPassword from './components/loginRegister/ResetPassword';

function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                {/* <Route path="/projects" element={<Projects/>} /> */}
                {/* <Route path="/notes" element={<Notes/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/admin" element={<Admin/>} /> */}
                <Route path="/login" element={<Login/>}/> 
                <Route path="/register" element={<Register/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
            </Routes>
        </div>
    );
}

export default App
