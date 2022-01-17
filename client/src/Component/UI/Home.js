import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "../../App";

function Home(){
const [data, setData] = useState([]);
const [like, setLike] = useState("");
const {state, dispatch} = useContext(UserContext);
useEffect(()=>{
  fetch('/allpost', {
    method:"POST",
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=> res.json())
    .then(result=>{
      console.log(result)
      setData(result.post)
    })
}, [])


const likePost = (id) => {
      fetch("/like",{
        method:"PUT",
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: new URLSearchParams({
          id:id
        })
      }).then(res=> res.json())
        .then(result =>{
          const newData = data.map(post=>{
            if(post._id === result._id){
              return result
            }else{
              return post
            }
          })
          setData(newData);
        })
        .catch(e=> console.log(e))
}

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
    .then((result) =>{
         const newData =  data.map((post) => {
            if(post._id === result._id) {
              return result
            }else{
              return  post
            }
          })
        setData(newData)
        })
    .catch((e) => console.log(e));
};
       
    return (
      <div className="home">
        {data.map((posts, index)=>{
             return (
               <div
                 className="card home-card mb-5"
                 key={index}
                 style={{ maxWidth: "40rem" }}
               >
                 <div style={{ padding: "0rem 1rem" }}>
                   <h5>{posts.postedBy.name}</h5>
                 </div>
                 <div>
                   <img src={posts.photo} className="card-img-top" alt="..." />
                 </div>
                 <div className="card-body">
                   <div>
                     <i
                       className="bi bi-heart"
                       style={{ BackgroundColor: like ? "red" : "" }}
                       onClick={() => {    
                         if(!posts.likes.includes(state._id)){
                          likePost(posts._id)
                         }else{
                          removeLikePost(posts._id)
                         } 
                       }}
                     ></i>
                     <i className="bi bi-chat"></i>
                   </div>
                   <p>{posts.likes.length} likes</p>
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
               </div>
             );
        })}
      </div>
    );
    
}

export default Home