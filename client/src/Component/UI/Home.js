import React, {useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Home(){
const [comment, setComment] = useState([])
const [data, setData] = useState([]);
const [like, setLike] = useState("");
const {state, dispatch} = useContext(UserContext);
console.log(useContext(UserContext));
useEffect(()=>{
  fetch('/explore', {
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

const addComment = (text, postId) => {
  
  fetch("/comment", {
    method:"PUT",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded",
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    },
    body:new URLSearchParams({
      text:text,
      _id:postId
    })
  }).then(res=> res.json())
    .then(result=> {
      const newData = data.map(post=>{
        if(post._id === result._id){
          return result
        }else{
          return post
        }
      })
      setData(newData)
    })
    .catch(err=> console.log(err))
}

const deletePost = (id) => {
  fetch(`/deletepost/${id}`,{
    method:"DELETE",
    headers:{
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=> res.json())
    .then(result=> {
      setData(result.data)
    })
    .catch((err) =>console.log(err))
}

const deleteComment = (id, commId) => {
  fetch(`/deletecomment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body:new URLSearchParams({
      commId:commId
    })
  })
    .then((res) => res.json())
    .then((result) => {
        const newData = data.map(info=>{
          if(info._id === result._id){
            return result
          }else{
            return info
          }
        })
        setData(newData)
    })
    .catch((err) => console.log(err));
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
                 {console.log(state.profilePicture.url)}
                 <div
                   style={{
                     padding: "0rem 1rem",
                     display: "flex",
                     justifyContent: "space-between",
                     alignContent: "center",
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
                               "upload/w_35"
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
                               "upload/w_35"
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

export default Home