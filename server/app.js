const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
require('dotenv').config();
const User = require('./model/User');
const Post = require('./model/Post')
const authRoutes = require('./Route/auth');
const postRoutes = require('./Route/post');
const userRoutes = require('./Route/user');
const path = require("path");

const PORT = process.env.PORT || 2000;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', console.error.bind("Connection Error"))
db.once("open", ()=>{
    console.log("DATABASE CONNECTED")
})
app.use(express.urlencoded());
app.use(express.json());
app.use(cors())


app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);

 app.use(express.static(path.resolve(__dirname, "./client/build")));
 
 app.get("*", function (request, response) {
   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
 });

app.use((err, req, res, next) => {
    console.log(err)
     next(err)
})

app.use((err, req, res, next)=> {
  const {status = 500, message = "something went wrong"} = err;
  return res.status(status).json({error:message})
})

app.listen(PORT, ()=> {
    console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
})