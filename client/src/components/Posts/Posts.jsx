// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "./Posts.css";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  const onLike = (id) => {};

  const onDelete = (id) => {};

  console.log(posts);

  return (
    <>
      {!posts.length ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <>
              <div key={post.id} className="flex justify-center items-center">
                <Post
                  post={post}
                  onDelete={onDelete}
                  onLike={onLike}
                  setCurrentId={setCurrentId}
                />
              </div>
              <br />
            </>
          ))}
        </div>
      )}
    </>
  );
};

Posts.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
}

export default Posts;
