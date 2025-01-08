import React, { useState } from "react";
import { PostClient } from "../managers/post_manager";

export const CreatePostPage = () => {
    const postClient = new PostClient();

    const listOfTags = ["#IT", "#AI", "#host", "#games", "#PC", "#GAY", "#ROFL"]; 

    const [formData, setFormData] = useState({
        user_author: "",
        title: "",
        short_description: "",
        likes: 0,
        dislikes: 0,
        wow_reactions: 0,
        views: 0,
        tags: [] as string[] 
    });

    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredTags, setFilteredTags] = useState(listOfTags);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredTags(listOfTags.filter(tag => tag.toLowerCase().includes(term)));
    };

    const handleTagClick = (tag: string) => {
        if (!formData.tags.includes(tag)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tag]
            });
        }
    };

    const handleTagRemoval = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag)
        });
    };

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseInt(value) : value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const newPost = {
            user_author: formData.user_author,
            title: formData.title,
            short_description: formData.short_description,
            reaction: {
                likes: formData.likes,
                dislikes: formData.dislikes,
                wow_reactions: formData.wow_reactions
            },
            views: formData.views,
            tags: formData.tags
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Author:</label>
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
                    <label>Short Description:</label>
                    <input
                        type="text"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tags:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder=""
                    />
                    <div style={{ border: "1px solid #ccc", padding: "5px", maxHeight: "100px", overflowY: "auto" }}>
                        {filteredTags.map(tag => (
                            <span
                                key={tag}
                                style={{
                                    display: "inline-block",
                                    margin: "5px",
                                    padding: "5px 10px",
                                    border: "1px solid #000",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    backgroundColor: formData.tags.includes(tag) ? "#ddd" : "#fff"
                                }}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div>
                        <strong>Selected Tags:</strong>
                        {formData.tags.map(tag => (
                            <span
                                key={tag}
                                style={{
                                    display: "inline-block",
                                    margin: "5px",
                                    padding: "5px 10px",
                                    border: "1px solid #000",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    backgroundColor: "#ffcccc"
                                }}
                                onClick={() => handleTagRemoval(tag)}
                            >
                                {tag} (Delet Tag)
                            </span>
                        ))}
                    </div>
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};
