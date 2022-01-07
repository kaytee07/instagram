import React from "react";

function Profile() {
  return (
    <div className="profile">
      <div
        className="row header"
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px",
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
            style={{ width: "160px", height: "160px", borderRadius: "50%" }}
            alt="profilepic"
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div className="col-7">
          <h4>Tag Havana</h4>
          <div className="d-flex flex-row ">
            <h6 className="me-3">40 post</h6>
            <h6 className="me-3">10 followers</h6>
            <h6 className="me-3">20 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          alt=""
          src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          alt=""
          src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          alt=""
          src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <img
          className="item"
          alt=""
          src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
      </div>
    </div>
  );
}

export default Profile;
