import React, { useState, useEffect } from "react";

async function fetchSimilarPost(letters: string) {
    const response = await fetch(`http://localhost:4444/API/search_posts/?letters=${letters}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const InputSearchBar = () => {
    const [searchText, setSearchText] = useState<string>(""); // Текст введення
    const [results, setResults] = useState<any[]>([]); // Результати пошуку
    const [isLoading, setIsLoading] = useState<boolean>(false); // Стан завантаження
    const [isFocused, setIsFocused] = useState<boolean>(false); // Стан фокусу на полі вводу

    // Затримка (debounce) для пошуку
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchText.trim()) {
                setIsLoading(true);
                fetchSimilarPost(searchText)
                    .then((data) => {
                        setResults(data);
                    })
                    .catch((error) => console.error("Error fetching posts:", error))
                    .finally(() => setIsLoading(false));
            } else {
                setResults([]); // Якщо поле порожнє, очищуємо результати
            }
        }, 300); // Затримка у 300 мс

        return () => clearTimeout(delayDebounce); // Очищаємо попередній таймер
    }, [searchText]);

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search posts..."
                className="nav-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // Оновлюємо текст введення
                onFocus={() => setIsFocused(true)} // Встановлюємо фокус
                onBlur={() => setIsFocused(false)} // Знімаємо фокус
            />
            {isFocused && results.length > 0 && (
                <div className="ListBox">
                    <div className="results-grid">
                        {results.map((result, index) => (
                            <div key={index} className="list-item">
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
