import React from "react";

function Home(){

    return (
      <div className="home">
        <div className="card home-card" style={{ maxWidth: "40rem" }}>
          <div style={{ padding: "0rem 1rem" }}>
            <h5>Taylor</h5>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="card-body">
            <p className="card-text">
              <span>
                <b>Taylor</b>
              </span>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
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
          </div>
        </div>
      </div>
    );
    
}

export default Home