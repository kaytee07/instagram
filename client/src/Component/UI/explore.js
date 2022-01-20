import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Explore() {
  const [comment, setComment] = useState([]);
  const [data, setData] = useState([]);
  const [like, setLike] = useState("");
  const { state, dispatch } = useContext(UserContext);
  console.log(useContext(UserContext));
  useEffect(() => {
    fetch("/allpost", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
        console.log(result);
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
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: new URLSearchParams({
        commId: commId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        console.log(newData)
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
              <h5>
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
              </h5>
              {posts.postedBy._id === state._id ? (
                <i
                  className="bi bi-trash-fill"
                  onClick={() => deletePost(posts._id)}
                ></i>
              ) : (
                ""
              )}
            </div>
            <div>
              <img src={posts.photo} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <div>
                <i
                  className="bi bi-heart"
                  style={{ BackgroundColor: like ? "red" : "", cursor:"pointer" }}
                  onClick={() => {
                    if (!posts.likes.includes(state._id)) {
                      likePost(posts._id);
                    } else {
                      removeLikePost(posts._id);
                    }
                  }}
                ></i>
                <i className="bi bi-chat"></i>
              </div>
              <p>{posts.likes.length} likes</p>
              <p className="card-text">
                <span>
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
                </span>
                {posts.body}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(e.target[0].value, posts._id);
                }}
              >
                <input
                  placeholder="comment"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    width: "100%",
                    borderColor: "rgba(0,0,0,.125)",
                  }}
                />
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
                      <span style={{ fontWeight: "500" }}>
                        {msg.postedBy.name}
                      </span>{" "}
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
