import express from "express";
import Post from "../models/userpost_model.js";

const post_router = express.Router();

post_router.post("/post", async (req, res) => {
  const { user_author, title, short_description, tags } = req.body; 
  try {
    const post = { user_author, title, short_description, tags }; 
    const createdPost = await Post.create(post);
    console.log("Post added");
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

post_router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return res.status(404).send("No posts found");
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});

post_router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching post");
  }
});

post_router.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const allowedFields = ["title", "short_description", "reaction", "views"];
  const updates = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }
    res.status(200).json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating post");
  }
});

post_router.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Post not found");
    }
    console.log("Post deleted");
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
});

//______________________________________up_vote_____________________________________________________//
post_router.post("/upvote/:id/:id_user", async (req, res) => {
  const { id,id_user } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    //Verefy if already voted
    if (post.upvotedBy.includes(id_user)) {
      return res.status(400).send("User has already upvoted this post");
    }
    //ADD user if not 
    post.upvotedBy.push(id_user);
    post.rate += 1;
    await post.save();
    res.status(200).send("Post rate up successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error upvoting post");
  }
});

post_router.post("/downvote/:id/:id_user", async (req, res) => {
  const { id, id_user } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.upvotedBy.includes(id_user)) {
      return res.status(400).send("User has already upvoted this post");
    }
    post.rate -= 1;
    await post.save();
    res.status(200).send("Post downvoted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downvoting post");
  }
});

export default post_router;
