import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../../App";
import axios from 'axios'



function Profile() {
  const [post, setPost] = useState([])
  const [profileURL, setProfileURL] = useState("");
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
          justifyContent: "space-around",
          margin: "18px",
          maxWidth: "800px",
        }}
      >
        <div
          className="col-md-4"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <img
            style={{ width: "160px", borderRadius: "50%" }}
            alt="profilepic"
            src={state ? state.profilePicture.url : ""}
          />
          <div
            onClick={() => removeProfilePicture()}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2rem",
              width: "2rem",
              bottom: "28%",
              left: "58%",
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
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
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2rem",
              width: "2rem",
              bottom: "27%",
              left: "47%",
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
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
          className="col-md-7 d-flex flex-row"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <div>
            <h4>{state ? state.name : ""}</h4>
            <h5>{state ? state.email : ""}</h5>
            <section className="d-flex flex-row ">
              <h6 className="me-3">{post.length} post</h6>
              <h6 className="me-3">
                {user ? user.followers.length : ""} followers
              </h6>
              <h6 className="me-3">
                {user ? user.following.length : ""} following
              </h6>
            </section>
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
