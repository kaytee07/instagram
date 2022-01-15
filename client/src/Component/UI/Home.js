import React, {useEffect, useState} from "react";


function Home(){
const [data, setData] = useState([]);
useEffect(()=>{
  fetch('/allpost', {
    method:"POST",
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=> res.json())
    .then(result=>{
      setData(result.post)
    })
}, [])
       
    return (
      <div className="home">
        {data.map((posts, index)=>{
             return(<div className="card home-card mb-5" key={index} style={{ maxWidth: "40rem" }}>
               <div style={{ padding: "0rem 1rem" }}>
                 <h5>{posts.postedBy.name}</h5>
               </div>
               <div>
                 <img src={posts.photo} className="card-img-top" alt="..." />
               </div>
               <div className="card-body">
                 <div>
                   <i className="bi bi-heart"></i>
                   <i className="bi bi-chat"></i>
                 </div>
                 <p className="card-text">
                   <span>
                     <b>{posts.postedBy.name}</b>
                   </span>
                   {posts.body}
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
             </div>)
        })}
      </div>
    );
    
}

export default Home