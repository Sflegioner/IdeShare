import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostClient, PostInterface } from "../managers/post_manager";
import "../page_styles/post_page.css";
import { useCookies } from "react-cookie";

async function fetchPosts(): Promise<PostInterface[]> {
  const post_client = new PostClient();
  return post_client.GetPost();
}

export const AllPostPage = () => {
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [cookies] = useCookies();
  const idUser = cookies.userId;
  const location = useLocation();
  const postId = location.state?.postId;
  const base_api_url = "http://localhost:4444/API";

  const sortPostsByRating = (posts: PostInterface[]): PostInterface[] => {
    return posts.sort((a, b) => b.rate - a.rate);
  };

  const UpVote = async (postId: string) => {
    if (!idUser) {
      console.error("No user id found in cookies");
      return;
    }
    try {
      const response = await fetch(
        `${base_api_url}/upvote/${postId}/${idUser}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.error("Upvote failed");
        return;
      }
      const updatedPosts = await fetchPosts();
      setPosts(sortPostsByRating(updatedPosts));
    } catch (error) {
      console.error("Error in upvote:", error);
    }
  };

  const DownVote = async (postId: string) => {
    if (!idUser) {
      console.error("No user id found in cookies");
      return;
    }
    try {
      const response = await fetch(
        `${base_api_url}/downvote/${postId}/${idUser}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.error("Downvote failed");
        return;
      }
      const updatedPosts = await fetchPosts();
      setPosts(sortPostsByRating(updatedPosts));
    } catch (error) {
      console.error("Error in downvote:", error);
    }
  };

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        if (postId) {
          const filteredPosts = data.filter((post) => post.id === postId);
          setPosts(filteredPosts);
        } else {
          setPosts(sortPostsByRating(data));
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="post-body"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <h2 className="post-title">{post.title}</h2>
              <p>Auth: {post.user_author}</p>
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
              <div className="tags-container">
                <strong>Tags: </strong>
                {post.tags.length > 0 ? (
                  post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag-item">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span>No tags</span>
                )}
              </div>
              <div className="ContainerRate">
                <button
                  className="vote-button upvote"
                  onClick={() => UpVote(post.id!)}
                  aria-label="Upvote"
                >
                  <svg
                    aria-hidden="true"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 26h32L18 10z" />
                  </svg>
                </button>
                <p className="vote-count">{post.rate}</p>
                <button
                  className="vote-button downvote"
                  onClick={() => DownVote(post.id!)}
                  aria-label="Downvote"
                >
                  <svg
                    aria-hidden="true"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 10h32L18 26z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </div>
    </div>
  );
};

export default AllPostPage;
