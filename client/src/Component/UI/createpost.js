import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";

function CreatePost(){
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  
  

  const postToCloudinary = () => {
    setLoad(true)
     const data = new FormData();
     data.append("file", image);
     data.append("body", JSON.stringify({
         title: title,
         body: body,
       }))
     axios.post("/createpost", data, {
       headers: {
         "Content-Type": "multipart/form-data",
         Authorization: "Bearer " + localStorage.getItem("jwt"),
       }
     })
       .then((res) => {
              setLoad(false)
              navigate("/")
              
      })
      //.then(data=>{
      //    if(data.error){
      //      setError(data.error)
      //    }
      //  })
       .catch((err) => setError(err));
     
  }

    return (
      <div
        className="d-flex  align-items-center mt-5"
        style={{ flexDirection: "column" }}
      >
        {error ? (
          <div
            style={{ width: "22rem" }}
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
          </div>
        ) : (
          ""
        )}
        <div className="card createpost" style={{ maxWidth: "28rem" }}>
          <div className="card-body">
            <h5>Upload Photo</h5>
            <div className="mb-3">
              <label htmlFor="exampleInputTitle1" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputTitle1"
                aria-describedby="emailHelp"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputCaption1" className="form-label">
                Caption
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputCaption1"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                name="file"
                type="file"
                className="form-control"
                id="exampleInputCaption1"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              onClick={() => postToCloudinary()}
              className="btn btn-primary"
            >
              Post
            </button>
          </div>
        </div>
        {
          load ? <div className="loadpage">
            <h4>...PLEASE WAIT</h4>
        </div> : ""
        }
         
      </div>
    );
}

export default CreatePost