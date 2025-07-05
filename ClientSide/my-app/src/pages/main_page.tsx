import React from "react";
import "../page_styles/main_page.css";
export const MainPage = () => {
  const examplePosts = [
    {
      id: "1",
      title: "AI Study Buddy",
      user_author: "Alice Zhang",
      short_description:
        "A Chrome extension that uses ChatGPT to summarize, explain, and quiz you on your reading material.",
      reaction: { likes: 23, dislikes: 1, wow_reactions: 6 },
      tags: ["AI", "Education", "Chrome Extension"],
      rate: 17,
    },
    {
      id: "2",
      title: "GreenCommute App",
      user_author: "James Liu",
      short_description:
        "Mobile app that suggests environmentally friendly routes for biking and public transit, with gamified carbon tracking.",
      reaction: { likes: 15, dislikes: 2, wow_reactions: 8 },
      tags: ["Sustainability", "Mobile", "React Native"],
      rate: 21,
    },
    {
      id: "3",
      title: "SkillSwap Platform",
      user_author: "Maria Gonzalez",
      short_description:
        "A web platform where people can trade skills — e.g., coding lessons for language tutoring.",
      reaction: { likes: 30, dislikes: 0, wow_reactions: 12 },
      tags: ["Web", "Social", "Marketplace"],
      rate: 28,
    },
  ];

  return (
    <>
      <div>
        {}
        <div className="block-one">
          <div className="section-left">
            Explore ideas and collaborate to build projects
          </div>
          <div className="section-right">
            <div className="picture">
              <img
                src="image.jpg" // path to your image
                alt="Our company"
                className="picture-img"
              />
            </div>
          </div>
        </div>
        <div className="dotted-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="dot" />
          ))}
        </div>
        <div className="block-two">
          <div className="authenticate">
            <button>Log in</button>
            or
            <button>Sign up</button>
            and create your profile
          </div>
        </div>
        <div className="dotted-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="dot" />
          ))}
        </div>
        <div className="block-three">
          <div className="section-left">Apply to join projects</div>
          <div className="section-right">
            <div className="project-container">
              {examplePosts.map((post, index) => (
                <div key={index} className="post-body">
                  <h2 className="post-title">{post.title}</h2>
                  <p>
                    <strong>Author:</strong> {post.user_author}
                  </p>
                  <p className="post-description">{post.short_description}</p>

                  <div className="reactions-bar">
                    <ul className="ul-reactions">
                      <li className="reaction-item">
                        <img src="like.png" width={16} height={16} alt="like" />
                        <span>{post.reaction.likes}</span>
                      </li>
                      <li className="reaction-item">
                        <img
                          src="poop.png"
                          width={16}
                          height={16}
                          alt="dislike"
                        />
                        <span>{post.reaction.dislikes}</span>
                      </li>
                      <li className="reaction-item">
                        <img src="wow.png" width={16} height={16} alt="wow" />
                        <span>{post.reaction.wow_reactions}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="tags-container">
                    <strong>Tags:</strong>{" "}
                    {post.tags.map((tag, i) => (
                      <span key={i} className="tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="ContainerRate">
                    <button className="vote-button upvote">▲</button>
                    <p className="vote-count">{post.rate}</p>
                    <button className="vote-button downvote">▼</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
