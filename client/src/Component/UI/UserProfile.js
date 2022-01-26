import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";


function UserProfile() {
  const [user, setUser] = useState("")
  const [name, setName] = useState("")
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const {id} = useParams();
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
                src={name.profilePicture.url}
              />
            </div>
            <div
              className="col-7 d-flex flex-row align-items-center"
              style={{
                padding:"0",
                width: "fit-content",
              }}
            >
              <div>
                <div className=" mb-3 d-flex">
                  <h4 className="mb-0 mx-1">{name.name}</h4>
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
                <div className="mb-3">
                  <h5 className="">{name.email}</h5>
                </div>
                <section className="d-flex flex-row justify-content-between">
                  <h6 className="me-3 ">{post.length} post</h6>
                  <h6 className="me-3">{name.followers.length} followers</h6>
                  <h6 className="me-3">{name.following.length} following</h6>
                </section>
              </div>
              <div className="d-flex justify-content-center"></div>
            </div>
          </div>
          <hr className="line"></hr>
          <div className="gallery">
            {post.map((post, index) => {
              return <img key={index} className="item" alt="" src={post.url} />;
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
