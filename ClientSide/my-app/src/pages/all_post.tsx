import React, { useEffect, useState } from "react";
import { PostClient, PostInterface } from "../managers/post_manager";
import "../page_styles/post_page.css"

async function fetchPosts(): Promise<PostInterface[]> {
    const post_client = new PostClient();
    return post_client.GetPost();
}

function AddViews(){
    
}

function OpenPost(){
    console.log("Open Post")//TODO: Add post opener
}

function AddSometing(){

}

export const AllPostPage = () => {
    const [posts, setPosts] = useState<PostInterface[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts()
            .then((data) => setPosts(data))
            .catch((error) => console.error("error:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>ZzZzzZZZzzz</div>;
    }

    return (
        <div className="post-page">
            <div>
                {posts?.map((post, index) => (
                    <div key={index} className="post-body" onClick={OpenPost}
                        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
                    >
                        <h2 className="post-title">{post.title}</h2>
                        <p>auth: {post.user_author}</p>

                        <p className="post-description">{post.short_description}</p>

                        <div className="reactions-bar">
                            <ul className="ul-reactions">
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
                    </div>
                ))}
            </div>
        </div>
    );
};
