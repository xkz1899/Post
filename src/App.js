import React, { useState, useMemo } from "react";
import CreatePosts from "./CreatePosts";
import PostList from "./PostList";
import PostFilter from "./Component/PostFilter";

const App = () => {
  const [post, setPost] = useState([
    { id: 1, title: "One", body: "Description..." },
    { id: 2, title: "Two", body: "Description..." },
  ]);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...post].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return post;
  }, [filter.sort, post]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, filter.sort, post]);

  const create = (posts) => {
    const newPost = {
      id: Date.now(),
      ...posts,
    };
    setPost([...post, newPost]);
    posts.title = "";
    posts.body = "";
  };
  const remove = (posts) => {
    setPost([...post].filter((item) => item.id !== posts.id));
  };

  return (
    <div>
      <CreatePosts create={create} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedPosts.length ? (
        <PostList post={sortedAndSearchedPosts} remove={remove} />
      ) : (
        <h1>Постов не найдено!</h1>
      )}
    </div>
  );
};

export default App;
