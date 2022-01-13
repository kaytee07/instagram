import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function CreatePost(){
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    if(url){
       fetch("/createpost", {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
         body: new URLSearchParams({
           title,
           body,
           url,
         }),
       })
         .then((res) => res.json())
         .then((data) => {
           if (!data.error) {
             console.log(data);
             setError(data.message);
             navigate("/home");
           } else {
             setError(data.error);
           }
         })
         .catch((err) => console.log(err));
    }
  },[url])

  const postToCloudinary = () => {
    console.log(localStorage.getItem("jwt"))
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset","instagram");
    data.append("cloud_name", "dbyubqmb0");
    fetch("https://api.cloudinary.com/v1_1/dbyubqmb0/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url);
      })
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
                Title
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
      </div>
    );
}

export default CreatePost