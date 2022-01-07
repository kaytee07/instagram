import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ width: "22rem" }}>
        <div className="card-body">
          <h5 className="card-title signin_title">The gram</h5>
          <form>
            <div className="mb-3">
              <div className="mb-3">
                <label for="exampleInputUsername1" className="form-label">
                  username
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputUsername1"
                />
              </div>
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
            <div>
              <Link to="/Login" className="card-link">
                signin?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
