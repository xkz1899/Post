import React, { useState, useMemo } from "react";
import CreatePosts from "./CreatePosts";
import Select from "./Component/UI/select/Select";
import PostList from "./PostList";
import Input from "./Component/UI/input/Input";

const App = () => {
  const [post, setPost] = useState([
    { id: 1, title: "One", body: "Description..." },
    { id: 2, title: "Two", body: "Description..." },
  ]);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      console.log("One");
      return [...post].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return post;
  }, [selectedSort, post]);
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
  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortPosts]);

  return (
    <div>
      <CreatePosts create={create} />
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select
        onChange={sortPosts}
        value={selectedSort}
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "body", name: "По описанию" },
        ]}
      />
      {sortedAndSearchedPosts.length ? (
        <PostList post={sortedAndSearchedPosts} remove={remove} />
      ) : (
        <h1>Постов не найдено!</h1>
      )}
    </div>
  );
};

export default App;
