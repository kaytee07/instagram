import './App.css';
import NavBar from './Component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './Component/UI/Home'
import Login from './Component/UI/Login';
import Signup from './Component/UI/Signup';
import Profile from './Component/UI/Profile';

function App() {
  return (
    <NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NavBar>
  );
}

export default App;
