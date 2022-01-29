const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const Post = require("../model/Post");
const verifyUser = require("../middleware/verifyUser");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/User");
const {storage} = require('../cloudinary/index')
const multer = require("multer");
const upload = multer({storage});
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


router.route("/user/:id")
     .get(verifyUser, catchAsync(async(req, res)=>{
        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            throw new AppError("User not found", 404)
        }
  
        const posts = await Post.find({postedBy:req.params.id}).populate("postedBy", "_id name photo")
        if(!posts){
            throw new AppError("No post yet",422)
        }
        res.json({posts, user})

     }))

router.route("/follow")
     .put(verifyUser,catchAsync(async(req, res)=>{
         const followUser = await User.findByIdAndUpdate(
           req.body.profileId,
           {
             $push: { followers: req.user._id },
           },
           { new: true }
         ).select("-password");
         
          
         const user = await User.findByIdAndUpdate(
           req.user._id,
           {
             $push: { following: req.body.profileId },
           },
           { new: true }
         ).select("-password");
           
       
      

         res.json({profile:followUser, myself:user})
         

     }))

     router.route("/unfollow").put(
       verifyUser,
       catchAsync(async (req, res) => {
         const followUser = await User.findByIdAndUpdate(
           req.body.profileId,
           {
             $pull: { followers: req.user._id },
           },
           { new: true }
         ).select("-password");

          const user = await User.findByIdAndUpdate(
            req.user._id,
            {
              $pull: { following: req.body.profileId },
            },
            { new: true }
          ).select("-password")

           res.json({ profile: followUser, myself: user });
       })
     );

     router.route("/postprofilepicture")
           .put(verifyUser, upload.single("file"),catchAsync(async(req,res)=>{
             const user = await User.findByIdAndUpdate( req.user._id)
               .select("-password")
             if (user.profilePicture.filename){
               await cloudinary.uploader.destroy(user.profilePicture.filename);
             }  
             user.profilePicture.url = req.file.path;
             user.profilePicture.filename = req.file.filename;
             user.save()
             res.json(user)
           }))
    
           router.route("/searchusers")
                 .post(verifyUser, catchAsync(async(req, res)=>{
                   let searchpattern = new RegExp(`^${req.body.query}`,"i")
                   let user = await User.find({
                     email: { $regex: searchpattern },
                   })
                    res.json({user})
                 }))

    router.route("/removeprofilepicture").put(
      verifyUser,
      catchAsync(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.user._id).select("-password");
        if (user.profilePicture.filename) {
          await cloudinary.uploader.destroy(user.profilePicture.filename);
          (user.profilePicture.url =
            "https://res.cloudinary.com/dbyubqmb0/image/upload/v1643394208/profilephoto/qi2jjpnwnytq4ebdimns.webp"),
            user.save();
        }
        res.json(user);
      })
    );



module.exports = router