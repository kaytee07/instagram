import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    fetch("http://localhost:2000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        name:username,
        password,
        email
      }),
    });
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title signin_title">The gram</h5>
          <form>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="exampleInputUsername1" className="form-label">
                  username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="exampleInputUsername1"
                />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" onClick={()=> postData()} className="btn btn-primary">
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
