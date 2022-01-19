import React,{useEffect, useReducer, useContext} from "react";
import { reducer, initialStatement, initialState } from "../reducers/userReducer";
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from "../App";


function NavBar(props){
const navigate = useNavigate();
const {state, dispatch} = useContext(UserContext)
const renderList = () => {
  if(state){
    return [
      <li key={1} className="nav-item">
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </li>,
      <li key={2} className="nav-item">
        <Link className="nav-link" to="/createpost">
          CreatePost
        </Link>
      </li>,
      <li key={3} className="nav-item">
        <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navigate("/login");
          }}
        >
          Logout
        </button>
      </li>,
    ];
  } else {
    return [
      <li key={1} className="nav-item">
        <Link className="nav-link" to="/signin">
          Signin
        </Link>
      </li>,
      <li key={2} className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>,
    ];
  }
}

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={state ? "/home" : "/login"}>
              The Gram
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse w-0 d-flex flex-row-reverse"
              id="navbarNav"
            >
              <ul className="navbar-nav " style={{ width: "fit-content" }}>
               {renderList()}
              </ul>
            </div>
          </div>
        </nav>
      {props.children}
      </div>
    );
}

export default NavBar;