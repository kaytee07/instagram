import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../../App";



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

 

  useEffect(()=>{
    if (profileURL) {
       fetch("/postprofilepicture", {
         method: "PUT",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
         body: new URLSearchParams({
            profileURL
         }),
       })
         .then((res) => res.json())
         .then((data) => {
           localStorage.setItem("user", JSON.stringify(data));
           const user = JSON.parse(localStorage.getItem("user"));
           dispatch({ type: "USER", payload: user });
           
         })
         .catch((err) => console.log(err));
    }
    }, [profileURL])

  function uploadProfilePicture() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dbyubqmb0");

    fetch("https://api.cloudinary.com/v1_1/dbyubqmb0/image/upload",{
      method:"POST",
      body:data
    }).then(res=> res.json())
      .then(data=>{
        setProfileURL(data.secure_url)
        console.log(data)
      })
      .catch((err)=> console.log(err))
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
          className="col-4"
          style={{
            display: "inline-block",
            width: "fit-content",
          }}
        >
          <img
            style={{ width: "160px", borderRadius: "50%" }}
            alt="profilepic"
            src={
              state.profilePicture
                ? state.profilePicture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <div
            onClick={() => profilePicModal()}
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
            <i className="bi bi-trash" style={{ margin: "0px" }}></i>
          </div>
          <div
            onClick={() => profilePicModal()}
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
            <i className="bi bi-upload" style={{ margin: "0px" }}></i>
          </div>
        </div>
        <div className="col-7 d-flex flex-row">
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
              src={post.photo}
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
