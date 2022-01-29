import React,{ useContext, useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from "../App";


function NavBar(props){
const [query, setQuery] = useState("") 
const [data, setData] = useState([]);
const navigate = useNavigate();
const {state, dispatch} = useContext(UserContext)
const renderList = () => {
  if(state){
    return [
      <li key={5} className="nav-item">
        <Link className="nav-link" to="/explore">
          Explore
        </Link>
      </li>,
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

    const searchUser = (query) =>{
      setQuery(query)
     
      fetch("/searchusers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type":"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
          query
        })
      }).then(res=> res.json())
        .then(data=> {
          setData(data.user);
        })
    }

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
          <div className="sandwich-btn">
            <Link className="navbar-brand" to={state ? "/" : "/login"}>
              The Gram
            </Link>

            {state ? (
              <i
                className="bi bi-search"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              ></i>
            ) : (
              ""
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navb navbar-collapse collapse " id="navbarNav">
            <ul className="navbar-nav ml-auto">{renderList()}</ul>
          </div>
        </nav>
        {props.children}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body">
                <div className="mb-4">
                  <label htmlFor="search">Search</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="search for user"
                    value={query}
                    onChange={(e) => searchUser(e.target.value)}
                  />
                </div>
                <ul class="list-unstyled">
                  {query
                    ? data.map((user, index) => {
                        return (
                          <li key={index} class="media">
                            <img
                              style={{ borderRadius: "50%" }}
                              class="mr-3"
                              src={user.profilePicture.url.replace(
                                "upload",
                                "upload/w_35"
                              )}
                              alt="Generic placeholder"
                            />
                            <div class="media-body">
                              <Link
                                to={
                                  state._id === user._id
                                    ? `profile`
                                    : `profile/${user._id}`
                                }
                              >
                                {user.name}
                              </Link>
                            </div>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default NavBar;