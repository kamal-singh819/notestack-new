import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Notes from './pages/Notes';
import DisplayPage from './pages/DisplayData';
import Articles from './pages/Articles';
import Admin from './pages/Admin';
import Login from './components/loginRegister/Login';
import Register from './components/loginRegister/Register';
import Profile from './pages/user/Profile';
import ResetPassword from './components/loginRegister/ResetPassword';
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:category" element={<DisplayPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
