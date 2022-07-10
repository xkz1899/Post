import React from "react";
import Button from "./Component/UI/button/Button";

const RenderPost = ({ post, remove }) => {
  return (
    <div>
      <div className="post">
        <div className="post__block">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <Button onClick={(e) => remove(post)}>Удалить</Button>
      </div>
    </div>
  );
};

export default RenderPost;
