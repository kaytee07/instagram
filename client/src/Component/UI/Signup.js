import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import {Alert} from 'react-bootstrap'

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const postData = () => {
        fetch("/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
         },
         body: new URLSearchParams({
           password,
           email,
           name:username,
           verifyPassword

         }),
       }).then(res=> res.json())
        . then(data=> {
            if (data.message) {
                navigate("/login")
            }else if(data.error){
              setError(data.error)
            }
        })
        .catch(e=> alert(e))   
  }
  
  return (
    <div
      className="d-flex  align-items-center mt-5"
      style={{ flexDirection: "column" }}
    >
      {error ? (
        <div
          style={{ width: "23rem" }}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
        </div>
      ) : (
        ""
      )}
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body mt-3">
          <h5 className="card-title signin_title">The gram</h5>
          <div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                {showPassword ? (
                  <i
                    className="bi bi-eye-slash realsee"
                    onClick={() => setShowPassword(false)}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye realsee"
                    onClick={() => setShowPassword(true)}
                  ></i>
                )}
              </div>
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="exampleInputVerifyPassword1"
                className="form-label"
              >
                Password
              </label>
              <div className="">
                <input
                  type={showVerifyPassword ? "text" : "password"}
                  placeholder="verify password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputVerifyPassword1"
                />
                {showVerifyPassword ? (
                  <i
                    class="bi bi-eye-slash see"
                    onClick={() => setShowVerifyPassword(false)}
                  ></i>
                ) : (
                  <i
                    class="bi bi-eye see"
                    onClick={() => setShowVerifyPassword(true)}
                  ></i>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={() => postData()}
              className="btn btn-primary"
            >
              Sign up
            </button>
            <div>
              <Link to="/Login" className="card-link">
                signin?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
