import React, {useState} from "react";
import {Link} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let alert = ""

 const postData = () => {
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert = data.message;
      })
      .catch((e) => console.log(e));
  }

 return (
   <div className="d-flex justify-content-center mt-5">
     <div className="card" style={{ width: "22rem" }}>
       <div class="alert alert-danger" role="alert">
        
       </div>
       <div className="card-body">
         <h5
           className="card-title signin_title"
           style={{ textAlign: "center" }}
         >
           The gram
         </h5>
         <div>
           <div className="mb-3">
             <label htmlFor="exampleInputEmail1" className="form-label">
               Email address
             </label>
             <input
               type="email"
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
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="form-control"
               id="exampleInputPassword1"
             />
           </div>
           <button
             type="submit"
             onClick={() => postData()}
             className="btn btn-primary"
           >
             Sign in
           </button>
           <div>
             <Link to="/signup" className="card-link">
               You don't have an account?
             </Link>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Login;
