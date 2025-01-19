import mongoose from "mongoose";
import express from "express";
import Post from "../models/userpost_model.js";


const search_user_route = express.Router();

async function getAllPost(letters) {
    try {
        const allPosts = await Post.find({ title: { $regex: letters, $options: "i" } }); 
        if (allPosts.length > 0) {
            return allPosts;
        } else {
            return { message: "No posts matched" };
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { error: "An error occurred while fetching posts" };
    }
}


search_user_route.get("/search_posts/", async (req, res) => {
    const letters = req.query.letters; 
    if (!letters) {
        return res.status(400).json({ error: "Missing 'letters' query parameter" });
    }

    const response = await getAllPost(letters); 
    return res.status(200).json(response);
});

export default search_user_route;