import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams, Link } from "react-router-dom";
import $ from 'jquery'

function UserProfile() {
  const [main, setMain] = useState("")
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
         setMain(data.mainuser);
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
                src={name.profilePicture.url.replace(
                  "upload",
                  "upload/w_400,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                )}
              />
            </div>
            <div
              className="col-7 d-flex flex-row align-items-center"
              style={{
                padding: "0",
                width: "fit-content",
              }}
            >
              <div style={{ width: "100%" }}>
                <div className=" mb-3 d-flex">
                  <h4 className="mb-0 username-btn">{name.name}</h4>
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
                <section className="d-flex flex-row ">
                  <h6 className="follow">{post.length} post</h6>
                  <h6
                    style={{ cursor: "pointer" }}
                    className="follow"
                    data-toggle="modal"
                    data-target="#exampleModalCenterfr"
                  >
                    {name.followers.length} followers
                  </h6>
                  <h6
                    style={{ cursor: "pointer" }}
                    className="follow"
                    data-toggle="modal"
                    data-target="#exampleModalCenterfwing"
                  >
                    {name.following.length} following
                  </h6>
                </section>
                <div className="mb-3">
                  <h5 className="">{name.email}</h5>
                </div>
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
      {
        main ?  <>
        <div
          className="modal fade"
          id="exampleModalCenterfr"
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
                {main.followers.map((followers) => {
                  return (
                    <li
                      className="mb-2"
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
                      <div class="media-body">
                        <Link
                          onClick={(e) => {
                            $("body").removeClass("modal-open");
                            $(".modal-backdrop").remove();
                          }}
                          to={state ? `/profile` : `/profile/${followers._id}`}
                        >
                          {followers.name}
                        </Link>
                      </div>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* following */}
        <div
          className="modal fade"
          id="exampleModalCenterfwing"
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
                {main.following.map((following) => {
                  return (
                    <li
                      className=""
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
                      <div class="media-body">
                        <Link
                          onClick={(e) => {
                            $("body").removeClass("modal-open");
                            $(".modal-backdrop").remove();
                          }}
                          to={state ? `/profile` : `/profile/${following._id}`}
                        >
                          {following.name}
                        </Link>
                      </div>
                      <hr></hr>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </> :
      ""
      }
    </>
  );
}

export default UserProfile;
