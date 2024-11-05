import express from "express";
import Post from "../models/userpost_model.js";

const post_router = express.Router();
post_router.post("/post", async (req, res) => {
  const { user_author, title } = req.body;
  try {
    const post = {
      user_author: user_author,
      title: title,
    };

    await Post.create(post);
    console.log("Post added");
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
});

post_router.get("/post/", (req, res) => {
  Post.find()
    .exec()
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(404).send("No posts found");
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      res
        .status(500)
        .send("An error occurred while fetching posts: " + error.message);
    });
});

post_router.get("/post/:id", (req, res) => {
  const { id } = req.params;
  Post.findOne({ _id: id })
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).send("Post not found");
      }
      res.send({
        user_author: post.user_author,
        title: post.title,
        reaction: post.reaction,
        views: post.views,
      });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).send("Error");
    });
});

post_router.put("/post/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const allowedFields = ["title", "reaction", "views"];
  const filteredBody = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  Post.findOneAndUpdate(
    { _id: id },
    { $set: filteredBody },
    { new: true, runValidators: true }
  )
    .exec()
    .then((updatedPost) => {
      if (!updatedPost) {
        return res.status(404).send("Post not found");
      }
      res.status(200).send({
        message: "Post updated successfully",
        user: {
          user_author: updatedPost.user_author,
          title: updatedPost.title,
          reaction: updatedPost.reaction,
          views: updatedPost.views,
        },
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error updating post");
    });
});

post_router.delete("/post/:id", (req, res) => {
  const { id } = req.params;
  Post.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send("User not found");
      }
      console.log("User has been deleted");
      res.status(200).send("Deleted successfully");
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error deleting user");
    });
});

export default post_router;
