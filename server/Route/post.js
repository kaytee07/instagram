<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Post = require("../model/Post");
const User = require("../model/User")
const verifyUser = require('../middleware/verifyUser');
const catchAsync = require("../utils/catchAsync");
const {storage, cloudinary} = require("../cloudinary/index")
const multer = require("multer");
const upload = multer({storage})

router.route('/allpost')
      .post(verifyUser,catchAsync(async(req, res)=>{
          const allpost = await Post.find()
            .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture");
          res.json({post:allpost})
      }))

router.route("/explore").post(
  verifyUser,
  catchAsync(async (req, res) => {
    const followingPost = await Post.find({
      $or: [
        { postedBy: { $in: req.user.following } },
        { postedBy: req.user._id },
      ],
    })
      .populate("postedBy", "_id name profilePicture")
      .populate("comment.postedBy", "_id name profilePicture");
    res.json({ post: followingPost });
  })
);

router.route('/mypost')
      .post(verifyUser,catchAsync(async(req,res)=>{
          const user = await User.findById(req.user._id).select("-password")
          const mypost = await Post.find({postedBy:req.user._id}).populate("postedBy","_id name followers following")
          res.json({mypost, user})
      }))

router.route('/like')
      .put(verifyUser,catchAsync(async(req,res)=>{
        const post = await Post.findByIdAndUpdate(req.body.id, { $push:{likes:req.user.id}},{new: true})
        .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
        .exec((err,result)=>{
            if(err){
                throw new AppError(err,403)
            }else{
                res.json(result)
            }
        })
      }))

router.route("/unlike").put(
  verifyUser,catchAsync(async (req, res) => {
  
    const post = await Post.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.user.id } },
      { new: true }
    ).populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
    .exec((err, result) => {
      if (err) {
        throw new AppError(err, 403);
      } else {
        res.json(result);
      }
    });
  })
);

router.route("/comment")
  .put(verifyUser, catchAsync(async(req,res)=>{
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $push: {
          comment: {
            text: req.body.text,
            postedBy: req.user._id,
          },
        },
      },
      { new: true }
    ).populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
    .exec((err, result) => {
      if (err) throw new AppError(err, 422);
      if (result) res.json(result);
    });

  }))

router.route("/deletepost/:postId")
      .delete(verifyUser,catchAsync(async(req,res)=>{
        const deletedPost = await Post.findByIdAndDelete({_id:req.params.postId})
        if(deletedPost){
          const post = await Post.find()
            .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture");
         
          res.status(200).json({message:"post deleted", data:post})
        }
        
      }))

router.route("/deletecomment/:postId")
.put(verifyUser,catchAsync(async (req, res) => {
    const deletedComment = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { comment: { _id: req.body.commId } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name profilePicture")
      .populate("comment.postedBy", "_id name profilePicture");
      res.json(deletedComment);
      } )
);

router.route('/createpost')
      .post(verifyUser,upload.single("file"),catchAsync(async(req, res)=>{
          const {title,body, url} = JSON.parse(req.body.body);
          if (!title || !body) {
            throw new AppError("Fill All the fields", 422);
          }
          
          const post = new Post({
              title,
              body,
              url:req.file.path,
              filename:req.file.filename,
              postedBy:req.user
          })

          const user = await User.findByIdAndUpdate(req.user._id,{
            $push:{posts:post._id}
          })

          const posted = await post.save();
          res.json(posted)
          
      }))


module.exports = router
||||||| empty tree
=======
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Post = require("../model/Post");
const User = require("../model/User")
const verifyUser = require('../middleware/verifyUser');
const catchAsync = require("../utils/catchAsync");
const {storage, cloudinary} = require("../cloudinary/index")
const multer = require("multer");
const upload = multer({storage})

router.route('/allpost')
      .post(verifyUser,catchAsync(async(req, res)=>{
          const allpost = await Post.find()
            .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture");
          res.json({post:allpost})
      }))

router.route("/explore").post(
  verifyUser,
  catchAsync(async (req, res) => {
    const followingPost = await Post.find({$or:[{postedBy: { $in: req.user.following }},{_id:req.user._id}]})
      .populate("postedBy", "_id name profilePicture")
      .populate("comment.postedBy", "_id name profilePicture");
    res.json({ post: followingPost });
  })
);

router.route('/mypost')
      .post(verifyUser,catchAsync(async(req,res)=>{
          const user = await User.findById(req.user._id).select("-password")
          const mypost = await Post.find({postedBy:req.user._id}).populate("postedBy","_id name followers following")
          res.json({mypost, user})
      }))

router.route('/like')
      .put(verifyUser,catchAsync(async(req,res)=>{
        const post = await Post.findByIdAndUpdate(req.body.id, { $push:{likes:req.user.id}},{new: true})
        .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
        .exec((err,result)=>{
            if(err){
                throw new AppError(err,403)
            }else{
                res.json(result)
            }
        })
      }))

router.route("/unlike").put(
  verifyUser,catchAsync(async (req, res) => {
  
    const post = await Post.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.user.id } },
      { new: true }
    ).populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
    .exec((err, result) => {
      if (err) {
        throw new AppError(err, 403);
      } else {
        res.json(result);
      }
    });
  })
);

router.route("/comment")
  .put(verifyUser, catchAsync(async(req,res)=>{
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $push: {
          comment: {
            text: req.body.text,
            postedBy: req.user._id,
          },
        },
      },
      { new: true }
    ).populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture")
    .exec((err, result) => {
      if (err) throw new AppError(err, 422);
      if (result) res.json(result);
    });

  }))

router.route("/deletepost/:postId")
      .delete(verifyUser,catchAsync(async(req,res)=>{
        const deletedPost = await Post.findByIdAndDelete({_id:req.params.postId})
        if(deletedPost){
          const post = await Post.find()
            .populate("postedBy", "_id name profilePicture")
            .populate("comment.postedBy", "_id name profilePicture");
         
          res.status(200).json({message:"post deleted", data:post})
        }
        
      }))

router.route("/deletecomment/:postId")
.put(verifyUser,catchAsync(async (req, res) => {
    const deletedComment = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { comment: { _id: req.body.commId } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name profilePicture")
      .populate("comment.postedBy", "_id name profilePicture");
      res.json(deletedComment);
      } )
);

router.route('/createpost')
      .post(verifyUser,upload.single("file"),catchAsync(async(req, res)=>{
          const {title,body, url} = JSON.parse(req.body.body);
          if (!title || !body) {
            throw new AppError("Fill All the fields", 422);
          }
          
          const post = new Post({
              title,
              body,
              url:req.file.path,
              filename:req.file.filename,
              postedBy:req.user
          })

          const user = await User.findByIdAndUpdate(req.user._id,{
            $push:{posts:post._id}
          })

          const posted = await post.save();
          res.json(posted)
          
      }))


module.exports = router
>>>>>>> 951dbcedd17d39980767bdddb52af9749128edfe
