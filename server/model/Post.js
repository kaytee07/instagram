const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comment: [
    {
      text: { type: String },
      postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps:true});

postSchema.pre("findByIdAndDelete", function(next){
    
});

module.exports = mongoose.model('Post', postSchema)