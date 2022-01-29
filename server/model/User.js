const { string } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  profilePicture:{
        url:{
          type:String,
        },
        filename:{
          type:String
        }
      }
});

module.exports = mongoose.model('User', userSchema)