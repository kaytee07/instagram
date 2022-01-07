import React from "react";

function CreatePost(){
    return (
      <div className="card createpost" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5>Upload Photo</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputTitle1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputTitle1"
                aria-describedby="emailHelp"
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
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="exampleInputCaption1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    );
}

export default CreatePost