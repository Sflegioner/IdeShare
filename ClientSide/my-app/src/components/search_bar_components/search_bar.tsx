import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function fetchSimilarPost(letters: string) {
    const response = await fetch(`http://localhost:4444/API/search_posts/?letters=${letters}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const data = await response.json();
    console.log("Fetched posts:", data);
    return data;
}

export const InputSearchBar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchText.trim()) {
                setIsLoading(true);
                fetchSimilarPost(searchText)
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setResults(data);
                        } else {
                            console.error("Data format is not an array:", data);
                            setResults([]);
                        }
                    })
                    .catch((error) => console.error("Error fetching posts:", error))
                    .finally(() => setIsLoading(false));
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    const handleResultClick = (postId: string | undefined) => {
        if (!postId) {
            console.error("Post ID is undefined");
            return;
        }
        console.log("Post ID clicked:", postId);
        navigate(`/all_posts`, { state: { postId } });
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search posts..."
                className="nav-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} 
            />
            {isFocused && results.length > 0 && (
                <div className="ListBox">
                    <div className="results-grid">
                        {results.map((result, index) => (
                            <div
                                key={result._id || index} 
                                className="list-item"
                                onMouseDown={() => handleResultClick(result._id)} 
                            >
                                <p>{result.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isLoading && <p>Loading...</p>}
        </div>
    );
};
