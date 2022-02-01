import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery'



function Profile() {
  const [modal, closeModal] = useState(false)
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
          className="col-4 d-flex p-0 flex-row align-items-center"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <img
            id="phoneprofile"
            className="profilefone"
            alt="profilepic"
            src={
              state
                ? state.profilePicture.url.replace(
                    "upload",
                    "upload/w_400,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                  )
                : ""
            }
          />
          <div onClick={() => removeProfilePicture()} className="trash">
            <i
              className="bi bi-trash"
              onClick={() => removeProfilePicture()}
              style={{ margin: "0px", cursor: "pointer" }}
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
              style={{ margin: "0px", cursor: "pointer" }}
            ></i>
          </div>
        </div>
        <div
          className="col-7 p-0 d-flex flex-row align-items-center"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <div>
            <div className="mb-3" style={{ width: "100%" }}>
              <h4>{state ? state.name : ""}</h4>
            </div>
            <section className="mb-2 d-flex flex-row justify-space-between ">
              <h6 className="follow">{post.length} post</h6>
              <h6
                style={{ cursor: "pointer" }}
                className="follow"
                data-toggle="modal"
                data-target="#exampleModalCenterfrs"
              >
                {user ? user.followers.length : ""} followers
              </h6>
              <h6
                style={{ cursor: "pointer" }}
                className="follow"
                data-toggle="modal"
                data-target="#exampleModalCenterfwings"
              >
                {user ? user.following.length : ""} following
              </h6>
            </section>
            <div className="mb-3">
              <h5>{state ? state.email : ""}</h5>
            </div>
          </div>
        </div>
      </div>
      <hr className="line"></hr>
      <div className="gallery">
        {post.map((post, index) => {
          return <img key={index} className="item" alt="" src={post.url} />;
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

      <>
        <div
          className="modal fade"
          id="exampleModalCenterfrs"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body"></div>
              <div className="header">
                <h4 className="pl-4">Followers</h4>
                <hr />
              </div>
              <ul className="">
                {user ? user.followers.map((followers,index) => {
                  return (
                    <li
                    key={index}
                      className=""
                      style={{ display: "flex", marginBottom: "10px" }}
                    >
                      <img
                        style={{ borderRadius: "50%" }}
                        className="mr-3"
                        src={followers.profilePicture.url.replace(
                          "upload",
                          "upload/w_39,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                        )}
                        alt="Generic placeholder"
                      />
                      <div className="media-body">
                        <Link
                          onClick={(e) => {
                            $("body").removeClass("modal-open");
                            $(".modal-backdrop").remove();
                          }}
                          to={state ? `/profile/${followers._id}` : `/profile`}
                        >
                          {followers.name}
                        </Link>
                      </div>
                      <hr />
                    </li>
                  );
                }):""}
              </ul>
            </div>
          </div>
        </div>
        {/* following */}
        <div
          className="modal fade"
          id="exampleModalCenterfwings"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body"></div>
              <div className="header">
                <h4 className="pl-4">Following</h4>
                <hr />
              </div>
              <ul className="">
                {user?user.following.map((following, index) => {
                  return (
                    <li
                      key={index}
                      className=""
                      data-toggle="modal"
                      style={{ display: "flex", marginBottom: "10px" }}
                    >
                      <img
                        style={{ borderRadius: "50%" }}
                        className="mr-3"
                        src={following.profilePicture.url.replace(
                          "upload",
                          "upload/w_39,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                        )}
                        alt="Generic placeholder"
                      />
                      <div className="media-body">
                        <Link
                          onClick={(e) => {
                            $("body").removeClass("modal-open");
                            $(".modal-backdrop").remove();
                          }}
                          to={state ? `/profile/${following._id}` : `/profile`}
                        >
                          {following.name}
                        </Link>
                      </div>
                      <hr />
                    </li>
                  );
                }):""}
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Profile;
