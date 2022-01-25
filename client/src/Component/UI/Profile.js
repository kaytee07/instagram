import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../../App";
import axios from 'axios'



function Profile() {
  const [post, setPost] = useState([])
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [profilePicture, setProfilePicture] = useState(false)
  const {state, dispatch} = useContext(UserContext);

  const profilePicModal = () => {
    profilePicture ? setProfilePicture(false): setProfilePicture(true)
  }

 


  function uploadProfilePicture() {
    const data = new FormData();
    data.append("file", image)

    axios
      .put("/postprofilepicture", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })  
     .then((res) =>{
        localStorage.setItem("user", JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({ type: "USER", payload: user });
     })
     .catch((err) => console.log(err));
  }

  function removeProfilePicture() {
    const data = new FormData();
    data.append("file", image);
     axios
      .put("/removeprofilepicture", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({ type: "USER", payload: user });
      })
      .catch((err) => console.log(err));
  }

  useEffect(()=>{
    fetch("/mypost",{
      method:"POST",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt"),
        "Content-Type":"application/ x-www-form-urlencoded"
      },
      body:new URLSearchParams({
        _id:state
      })
    }).then(res=> res.json())
    .then(data=>{
      setPost(data.mypost)
      setUser(data.user)
    })
  },[])


  return (
    <div className="profile ">
      <div
        className={profilePicture ? "layer" : ""}
        onClick={() => setProfilePicture(false)}
      ></div>
      <div
        className="row header"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "18px auto",
          maxWidth: "800px",
        }}
      >
        <div
          className="col-4 d-flex flex-row align-items-center"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <img
            id="phoneprofile"
            className="profilefone"
            alt="profilepic"
            src={state ? state.profilePicture.url : ""}
          />
          <div
            onClick={() => removeProfilePicture()}
            className="trash"
          >
            <i
              className="bi bi-trash"
              onClick={() => removeProfilePicture()}
              style={{ margin: "0px" }}
            ></i>
          </div>
          <div
            onClick={() => {
              profilePicModal();
              uploadProfilePicture();
            }}
            className="upload"
          >
            <i
              className="bi bi-upload"
              onClick={() => {
                profilePicModal();
                uploadProfilePicture();
              }}
              style={{ margin: "0px" }}
            ></i>
          </div>
        </div>
        <div
          className="col-7 d-flex flex-row align-items-center"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <div>
            <div className="mb-3">
              <h4>{state ? state.name : ""}</h4>
            </div>
            <section className="mb-2 d-flex flex-row justify-space-between ">
              <h6 className="">{post.length} post</h6>
              <h6 className="ml-3">
                {user ? user.followers.length : ""} followers
              </h6>
              <h6 className="ml-3">
                {user ? user.following.length : ""} following
              </h6>
            </section>
            <div className="mb-3">
              <h5>{state ? state.email : ""}</h5>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ margin: "4rem 0" }}></hr>
      <div className="gallery">
        {post.map((post, index) => {
          return (
            <img
              style={{ height: "213px" }}
              key={index}
              className="item"
              alt=""
              src={post.url}
            />
          );
        })}
      </div>
      {profilePicture ? (
        <div className="App profilepicmodal">
          <div>
            <label className="mb-3" htmlFor="exampleInputCaption1">
              Upload profile picture
            </label>
            <input
              type="file"
              name="file"
              className="form-control mb-3"
              id="exampleInputCaption1"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                profilePicModal(false);
                uploadProfilePicture();
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
