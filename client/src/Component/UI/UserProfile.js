import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const {id} = useParams;
  console.log(id)
//   useEffect(() => {
//     fetch("mypost", {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//         "Content-Type": "application/ x-www-form-urlencoded",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPost(data.mypost);
//       });
//   }, []);

  return (
    <div className="profile">
      <div
        className="row header"
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px",
        }}
      >
        <div
          className="col-4"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <img
            style={{ width: "160px", borderRadius: "50%" }}
            alt="profilepic"
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="col-7">
          <h4>{state.name}</h4>
          <div className="d-flex flex-row ">
            <h6 className="me-3">40 post</h6>
            <h6 className="me-3">10 followers</h6>
            <h6 className="me-3">20 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {post.map((post, index) => {
          return (
            <img
              style={{ height: "213px" }}
              key={index}
              className="item"
              alt=""
              src={post.photo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;
