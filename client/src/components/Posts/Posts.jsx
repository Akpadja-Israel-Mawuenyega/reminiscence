import React from "react";
import PropTypes from "prop-types";
import "./Posts.css";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log(posts);

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="posts">
          {!posts.length ? (
            <div className="text-center">No posts to show.</div>
          ) : (
            posts.map((post) => (
              <React.Fragment key={post._id}>
                <div className="flex justify-center items-center">
                  <Post post={post} setCurrentId={setCurrentId} />
                </div>
                <br />
              </React.Fragment>
            ))
          )}
        </div>
      )}
    </>
  );
};

Posts.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};

export default Posts;
