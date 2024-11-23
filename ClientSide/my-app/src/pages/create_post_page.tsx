import React, { useState } from "react";
import { PostClient } from "../managers/post_manager";

function GetPostFunc(){
    const postClient = new PostClient();
    async function GetPostFunc() {
        const posts = await postClient.GetPost();
        console.log(posts);
    }
    async function F() {
        const posts = await postClient.GetPost();
        console.log(posts);
    }

    return (
        <>
            <div>
                <button onClick={GetPostFunc}>GetPostFunc</button>
            </div>
        </>
    );
};

export const CreatePostPage = () => {
    const postClient = new PostClient();

    const [formData, setFormData] = useState({
        user_author: "",
        title: "",
        likes: 0,
        dislikes: 0,
        short_description:"",
        wow_reactions: 0,
        views: 0
    });

    const handleChange = (e:any) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseInt(value) : value
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const newPost = {
            user_author: formData.user_author,
            title: formData.title,
            short_description:formData.short_description,
            reaction: {
                likes: formData.likes,
                dislikes: formData.dislikes,
                wow_reactions: formData.wow_reactions
            },
            views: formData.views
        };

        try {
            const createdPost = await postClient.PostPost(newPost);
            console.log("Created post:", createdPost);
            alert("Post created successfully!");
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post.");
        }
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <p>___________________________________________________________________________________________</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:672bcb01e459b7fbf0f7e895</label>
                    <input
                        type="text"
                        name="user_author"
                        value={formData.user_author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Short description:</label>
                    <input
                        type="text"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Likes:</label>
                    <input
                        type="number"
                        name="likes"
                        value={formData.likes}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Dislikes:</label>
                    <input
                        type="number"
                        name="dislikes"
                        value={formData.dislikes}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Wow Reactions:</label>
                    <input
                        type="number"
                        name="wow_reactions"
                        value={formData.wow_reactions}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Views:</label>
                    <input
                        type="number"
                        name="views"
                        value={formData.views}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Post</button>  
                <p>___________________________________________________________________________________________</p>
                {GetPostFunc()}
                <p>___________________________________________________________________________________________</p>
            </form>
        </div>
    );
};
