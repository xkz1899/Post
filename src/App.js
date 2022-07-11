import React, { useState, useMemo } from "react";
import CreatePosts from "./Component/CreatePosts";
import PostFilter from "./Component/PostFilter";
import PostList from "./Component/PostList";
import Modal from "./Component/Modal/Modal";
import Button from "./Component/UI/button/Button";

const App = () => {
  const [post, setPost] = useState([
    { id: 1, title: "One", body: "Description..." },
    { id: 2, title: "Two", body: "Description..." },
  ]);
  const [modal, setModal] = useState(false);

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
    setModal(false);
  };
  const remove = (posts) => {
    setPost([...post].filter((item) => item.id !== posts.id));
  };

  return (
    <div className="container">
      <Button style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать новый пост
      </Button>
      <hr />
      <Modal visible={modal} setVisible={setModal}>
        <CreatePosts create={create} />
      </Modal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <hr />
      {sortedAndSearchedPosts.length ? (
        <PostList post={sortedAndSearchedPosts} remove={remove} />
      ) : (
        <h1>Постов не найдено!</h1>
      )}
    </div>
  );
};

export default App;
