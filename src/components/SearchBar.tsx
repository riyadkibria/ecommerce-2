"use client";

import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Search for: ${query}`);
    // You can replace this alert with your actual search logic
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex items-center border border-gray-300 rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 focus:outline-none"
        aria-label="Search input"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
