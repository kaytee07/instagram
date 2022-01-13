import React, { useEffect, useContext } from 'react';
import './App.css';
import NavBar from './Component/Navbar';
import { UserContext } from './Component/Navbar';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Component/UI/Home'
import Login from './Component/UI/Login';
import Signup from './Component/UI/Signup';
import Profile from './Component/UI/Profile';
import CreatePost from './Component/UI/createpost';

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
     // dispatch({ type: "USER", payload: user });
      navigate("/home")
    } else{
      navigate("/login")
    }
  },[])

  return (
    <NavBar>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </NavBar>
  );
}

export default App;
