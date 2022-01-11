import './App.css';
import NavBar from './Component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './Component/UI/Home'
import Login from './Component/UI/Login';
import Signup from './Component/UI/Signup';
import Profile from './Component/UI/Profile';
import CreatePost from './Component/UI/createpost';

function App() {
  return (
    <NavBar>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </NavBar>
  );
}

export default App;
