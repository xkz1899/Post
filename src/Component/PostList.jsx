import React from "react";
import RenderPost from "./RenderPost";

const PostList = ({ post, remove }) => {
  return (
    <>
      {post.length ? (
        post.map((item) => (
          <RenderPost key={post.id} post={item} remove={remove} />
        ))
      ) : (
        <h1>Постов не найдено!</h1>
      )}
    </>
  );
};

export default PostList;
