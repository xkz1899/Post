import React, { useState } from "react";
import RenderPost from "./RenderPost";
import CreatePosts from "./CreatePosts";
import Select from "./Component/UI/select/Select";

const App = () => {
  const [post, setPost] = useState([
    { id: 1, title: "One", body: "Description..." },
    { id: 2, title: "Two", body: "Description..." },
  ]);

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
      <Select
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "body", name: "По описанию" },
        ]}
      />
      {post.length ? (
        post.map((item, index) => (
          <RenderPost key={Date.now() + index} post={item} remove={remove} />
        ))
      ) : (
        <h1>Постов не найдено!</h1>
      )}
    </div>
  );
};

export default App;
