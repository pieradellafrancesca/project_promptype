"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const filteredPrompts = (searchWord) => {
    const regex = new RegExp(searchWord, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (el) =>
        regex.test(el.prompt) ||
        regex.test(el.tag) ||
        regex.test(el.creator.username)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchWord = filteredPrompts(e.target.value);
    setSearchedResults(searchWord);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchWord = filteredPrompts(tag);
    setSearchedResults(searchWord);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
