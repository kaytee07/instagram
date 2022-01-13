import React,{useEffect, useReducer} from "react";
import { reducer, initialStatement, initialState } from "../reducers/userReducer";
import {Link,useNavigate} from 'react-router-dom'

 export const UserContext = React.createContext();

function NavBar(props){
const navigate = useNavigate();
const [state,dispatch] = useReducer(reducer, initialState)
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
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
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createpost">
                    CreatePost
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <UserContext.Provider value={{state, dispatch}}>{props.children}</UserContext.Provider>
      </div>
    );
}

export default NavBar;