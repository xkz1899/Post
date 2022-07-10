import React from "react";
import RenderPost from "./RenderPost";

const PostList = ({ post, remove }) => {
  return (
    <>
      {post.map((item, index) => (
        <RenderPost key={Date.now() + index} post={item} remove={remove} />
      ))}
    </>
  );
};

export default PostList;
