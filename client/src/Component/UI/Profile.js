import React,{useState, useEffect, useContext} from "react";
import { UserContext } from "../../App";



function Profile() {
  const [post, setPost] = useState([])
  const [user, setUser] = useState("")
  const {state, dispatch} = useContext(UserContext);
 

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
      console.log(data)
    })
  },[])

  function followBtn(){

  }

  return (
    <div className="profile">
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
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          />
          <div
            style={{
              position: "relative",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              height:"2rem",
              width: "2rem",
              bottom:"18%",
              left: "47%",
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
            }}
          >
            <i class="bi bi-upload" style={{margin:"0px"}}></i>
          </div>
        </div>
        <div className="col-7 d-flex flex-row">
          <div>
            {console.log()}
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
    </div>
  );
}

export default Profile;
