const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../model/User');
const catchAsync = require('../utils/catchAsync');
const { route } = require('express/lib/application');
const verifyUser = require('../middleware/verifyUser');
const AppError = require('../utils/AppError');
const signupSchema = require('../middleware/validateSignup')
const signinSchema = require('../middleware/validateSignin')



router.route('/signup')
      .post(signupSchema,catchAsync(async(req, res)=>{
            const { name, email, password, verifyPassword } = req.body;        
            if(!name || !email || !password){
                  throw new AppError("fill all the fields")
            }
           const existingEmail =  await User.findOne({email});
           if(existingEmail) throw new AppError('email already exist', 400);
           if(password !==  verifyPassword) throw new AppError("passwords don't match", 403);
           await bcrypt.hash(password, 12, async function(err, hash){ 
                   const newUser = new User({ name, email, password:hash});
                   await newUser.save();
                   const user = await User.findOneAndUpdate({name:name},{
                         $set:{profilePicture:{url:"https://res.cloudinary.com/dbyubqmb0/image/upload/v1643394208/profilephoto/qi2jjpnwnytq4ebdimns.webp"}}
                   }, {new:true})
                   
             })  
             
             res.json({message:"success"})     
      }));


router.route('/signin')
      .post(signinSchema,catchAsync(async(req, res)=> {
            const {email, password} = req.body
            if(!password){
                 throw new AppError('Enter Email or Password', 401)
            }
            const registeredUser = await User.findOne({email})
            if(!registeredUser){
                throw new AppError('Invalid Email Or password1', 404)
            }

            if(bcrypt.compareSync(password, registeredUser.password)){
                  
                  const token = JWT.sign({id:registeredUser._id}, process.env.JWT_SECRET);
                  const {_id, name, email, followers, following, profilePicture} = registeredUser;
                  return res.json({token, user:{_id, name, email, followers, following, profilePicture}})
            }else{
                throw new AppError("invalid email or password", 422);
            }
      }))

module.exports = router