import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserPost = new mongoose.Schema({
  user_author: { type: ObjectId, required: true },
  title: { type: String, required: true },
  reaction: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    wow_reactions: { type: Number, default: 0 },
  },
  views: { type: Number, default: 0 },
});
const Post = mongoose.model("Post", UserPost);

export default Post;
