import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";


function UserProfile() {
  const [user, setUser] = useState("")
  const [name, setName] = useState("")
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const {id} = useParams();
  console.log(id)
  useEffect(() => {
    fetch(`/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data.posts)
        setName(data.user);
        console.log(data.user)
      });
  }, []);

  function followUser(profileId){
      fetch("/follow", {
        method:"PUT",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          profileId
        })
      }).then(res=>res.json())
        .then(result=>{
           setName(result.profile);
           setUser(result.myself);
        })
        .catch(err=> console.log(err))
  }

  function unFollowUser(profileId) {
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        profileId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
       setName(result.profile);
       setUser(result.myself);
       console.log(result)
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {name ? (
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
            </div>
            <div className="col-7 d-flex flex-row">
              <div>
                <h4>{name.name}</h4>
                <h5>{name.email}</h5>
                <section className="d-flex flex-row ">
                  <h6 className="me-3">{post.length} post</h6>
                  <h6 className="me-3">{name.followers.length} followers</h6>
                  <h6 className="me-3">{name.following.length} following</h6>
                </section>
              </div>
              <div>
                {name.followers.includes(state._id) ? (
                  <button
                    onClick={() => unFollowUser(name._id)}
                    className="btn btn-primary btn-sm"
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(name._id)}
                    className="btn btn-primary btn-sm"
                  >
                    follow
                  </button>
                )}
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
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
}

export default UserProfile;
