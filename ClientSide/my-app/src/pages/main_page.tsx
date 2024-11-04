import React from "react";
import '../page_styles/main_page.css'
export const MainPage = () => {
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
                            <p className="picture-text">
                                Here you will see an authentic picture representing our company
                            </p>
                        </div>
                    </div>
                </div>
                <div className="dotted-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
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
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="block-three">
                    <div className="section-left">Apply to join projects</div>
                    <div className="section-right">
                        <div className="project-container">
                            <div className="container"></div>
                            <div className="container"></div>
                            <div className="container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};