import React, { useState } from "react";
import Button from "./UI/button/Button";
import Input from "./UI/input/Input";

const CreatePosts = ({ create }) => {
  const [posts, setPosts] = useState({ title: "", body: "" });
  return (
    <div className="post-create">
      <Input
        type="text"
        placeholder="Title..."
        value={posts.title}
        onChange={(e) => setPosts({ ...posts, title: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Description..."
        value={posts.body}
        onChange={(e) => setPosts({ ...posts, body: e.target.value })}
      />
      <Button onClick={(e) => create(posts)}>Создать</Button>
    </div>
  );
};

export default CreatePosts;
