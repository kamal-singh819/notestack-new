import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Articles from './pages/Articles';
import Admin from './pages/Admin';
import Login from './components/loginRegister/Login';
import Register from './components/loginRegister/Register';
import Profile from './pages/user/Profile';
import ResetPassword from './components/loginRegister/ResetPassword';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
