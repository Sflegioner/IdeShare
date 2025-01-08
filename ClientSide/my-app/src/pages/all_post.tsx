import React, { useEffect, useState } from "react";
import { PostClient, PostInterface } from "../managers/post_manager";
import "../page_styles/post_page.css"
import { useNavigate } from "react-router-dom";

async function fetchPosts(): Promise<PostInterface[]> {
    const post_client = new PostClient();
    return post_client.GetPost();
}

function AddViews() {
    // TODO: Add view counter functionality
}

function OpenPost(){
    console.log("Open Post")//TODO: Add post opener
}



function AddSometing(){

}

export const AllPostPage = () => {
    const [posts, setPosts] = useState<PostInterface[] | null>(null);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    function Apply(id: string | undefined){
        console.log("Apply")
        navigate("/apply", {state: {postId: id}})
    }

    useEffect(() => {
        fetchPosts()
            .then((data) => setPosts(data))
            .catch((error) => console.error("error:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div className="post-page">
            <div>
                {posts?.map((post, index) => (
                    <div
                        key={index}
                        className="post-body"
                        onClick={OpenPost}
                        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
                    >
                        <h2 className="post-title">{post.title}</h2>
                        <p>Auth: {post.user_author}</p>
                        <p className="post-description">{post.short_description}</p>

                        <div className="reactions-bar">
                            <ul className="ul-reactions">
                                <li>
                                <button onClick={() =>Apply(post.id)} id="apply">
                                    Apply
                                </button>
                                </li>
                                <li className="reaction-item">
                                    <img src="like.png" width={20} height={20} alt="like" />
                                    <span>{post.reaction.likes}</span>
                                </li>
                                <li className="reaction-item">
                                    <img src="poop.png" width={20} height={20} alt="dislike" />
                                    <span>{post.reaction.dislikes}</span>
                                </li>
                                <li className="reaction-item">
                                    <img src="wow.png" width={20} height={20} alt="wow" />
                                    <span>{post.reaction.wow_reactions}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="tags-container">
                            <strong>Tags: </strong>
                            {post.tags.length > 0 ? (
                                post.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="tag-item"
                                    >
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span>No tags</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
