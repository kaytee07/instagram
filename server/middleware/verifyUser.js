const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/User');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    const token = authorization && authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user)=>{
        
        if(!user){
            throw new AppError("You must be logged in first", 403)
        }
        const { id } = user;
        const verifiedUser = await User.findById(id);
        verifiedUser.password = undefined
        req.user = verifiedUser
         next();
    })   
   
}