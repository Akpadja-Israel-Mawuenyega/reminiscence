import React, { useCallback } from "react";
import PropTypes from "prop-types";
import loadingGif from "../../loading.gif";
import nothingGif from "../../nothing.gif";
import "./Posts.css";
import { useSelector, shallowEqual } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector(
    (state) => state.posts,
    shallowEqual
  );

  const memoizedSetCurrentId = useCallback(
    (id) => {
      setCurrentId(id);
    },
    [setCurrentId]
  );

  console.log(posts);

  return (
    <>
      {isLoading ? (
        <img src={loadingGif} alt="Loading posts..." />
      ) : (
        <div className="posts">
          {!posts.length ? (
            <div className="flex flex-col justify-center items-center">
              <h2>No posts to show.</h2>
              <img
                src={nothingGif}
                alt="There is nothing is here."
                className="w-4/5 h-4/5 object-contain mx-auto rounded md mt-4"
              />
            </div>
          ) : (
            posts.map((post) => (
              <React.Fragment key={post._id}>
                <div className="flex justify-center items-center">
                  <Post post={post} setCurrentId={memoizedSetCurrentId} />
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
