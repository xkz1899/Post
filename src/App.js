import React, { useState, useEffect } from "react";
import CreatePosts from "./Component/CreatePosts";
import PostFilter from "./Component/PostFilter";
import PostList from "./Component/PostList";
import Modal from "./Component/Modal/Modal";
import Button from "./Component/UI/button/Button";
import { usePosts } from "./hooks/useHooks";
import PostService from "./API/PostService";
import Loader from "./Component/UI/loader/Loader";

const App = () => {
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(post, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  async function fetchPosts() {
    setIsPostsLoading(true);
    const response = await PostService.getAll();
    setPost(response.data);
    setIsPostsLoading(false);
  }
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
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList post={sortedAndSearchedPosts} remove={remove} />
      )}
    </div>
  );
};

export default App;
