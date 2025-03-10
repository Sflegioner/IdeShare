import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserPost = new mongoose.Schema({
  user_author: { type: ObjectId, required: true },
  short_description:{type:String},
  title: { type: String, required: true },
  reaction: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    wow_reactions: { type: Number, default: 0 },
  },
  views: { type: Number, default: 0 },
  tags:[],
  rate:{type: Number, default: 0},
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const Post = mongoose.model("Post", UserPost);

export default Post;
