import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Explore() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState("");
  const [like, setLike] = useState("");
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.post);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: new URLSearchParams({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };

  const removeLikePost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: new URLSearchParams({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };

  const addInfo = (id) => {
    addComment(info, id);
    setInfo("");
  };

  const addComment = (text, postId) => {
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: new URLSearchParams({
        text: text,
        _id: postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    fetch(`/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id, commId) => {
    fetch(`/deletecomment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: new URLSearchParams({
        commId: commId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      {data.map((posts, index) => {
        return (
          <div
            className="card home-card mb-5"
            key={index}
            style={{ maxWidth: "40rem" }}
          >
            <div
              style={{
                padding: "0rem 1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ margin: "0px", padding: "5px 0px" }}>
                {posts.postedBy._id === state._id ? (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/profile`}
                  >
                    <div className="d-flex">
                      <img
                        style={{ borderRadius: "50%" }}
                        src={posts.postedBy.profilePicture.url.replace(
                          "upload",
                          "upload/w_39,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                        )}
                        alt="..."
                      />
                      <p
                        className=""
                        style={{ padding: "6px 5px", margin: "0" }}
                      >
                        {posts.postedBy.name}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/profile/${posts.postedBy._id}`}
                  >
                    <div className="d-flex">
                      <img
                        style={{ borderRadius: "50%" }}
                        src={posts.postedBy.profilePicture.url.replace(
                          "upload",
                          "upload/w_39,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35"
                        )}
                        alt="..."
                      />
                      <p
                        className=""
                        style={{ padding: "6px 5px", margin: "0" }}
                      >
                        {posts.postedBy.name}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
              {posts.postedBy._id === state._id ? (
                <i
                  style={{ padding: "10px 0px", margin: "0" }}
                  className="bi bi-trash-fill"
                  onClick={() => deletePost(posts._id)}
                ></i>
              ) : (
                ""
              )}
            </div>
            <div>
              <img src={posts.url} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <div>
                <i
                  className="bi bi-heart"
                  style={{
                    BackgroundColor: like ? "red" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (!posts.likes.includes(state._id)) {
                      likePost(posts._id);
                    } else {
                      removeLikePost(posts._id);
                    }
                  }}
                ></i>
              </div>
              <p>{posts.likes.length} likes</p>
              <p className="card-text">
                <span className="mr-1">
                  <strong>
                    {posts.postedBy._id === state._id ? (
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/profile`}
                      >
                        {posts.postedBy.name}
                      </Link>
                    ) : (
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/profile/${posts.postedBy._id}`}
                      >
                        {posts.postedBy.name}
                      </Link>
                    )}
                  </strong>
                </span>

                {posts.body}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(e.target[0].value, posts._id);
                }}
              >
                 <div style={{ display: "flex", cursor: "pointer" }}>
                <input
                  onChange={(e) => setInfo(e.target.value)}
                  value={info}
                  className="mb-3"
                  placeholder="comment"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    width: "100%",
                    borderColor: "rgba(0,0,0,.125)",
                  }}
                />
                <i
                  type="submit"
                  className="bi bi-arrow-right-circle-fill ml-3"
                  onClick={(e) => addInfo(posts._id)}
                ></i>
                </div>
              </form>

              {posts.comment.map((msg, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div key={index}>
                      <Link
                        className="comm"
                        to={
                          msg.postedBy._id === state._id
                            ? `profile`
                            : `profile/${msg.postedBy._id}`
                        }
                        style={{ fontWeight: "500" }}
                      >
                        {msg.postedBy.name}
                      </Link>{" "}
                      {msg.text}
                    </div>
                    {msg.postedBy._id === state._id ? (
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => deleteComment(posts._id, msg._id)}
                      ></i>
                    ) : (
                      " "
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Explore;
