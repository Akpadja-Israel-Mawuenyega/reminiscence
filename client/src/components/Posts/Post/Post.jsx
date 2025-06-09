// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import "./Post.css"; // Make sure to import your CSS file

const Post = ({ post, onDelete, onLike, setCurrentId }) => {
  const [showBackground, setShowBackground] = useState(false);

  const handleMoreOptionsClick = () => {
    setShowBackground(true);
    setTimeout(() => {
      setShowBackground(false);
    }, 300);
    setCurrentId(post._id);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <div className="image-container" style={{ position: "relative" }}>
        <Card.Img variant="top" src={post.selectedFile} />
        <div className="image-overlay">
          <div className="overlay-content">
            <div className="overlay-left">
              <strong>{post.creator}</strong>
              <br />
              <small className="time-posted">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
            <button
              className={`more-options-button ${
                showBackground ? "active" : ""
              }`}
              onClick={handleMoreOptionsClick}
            >
              &#x2022;&#x2022;&#x2022;
            </button>
          </div>
        </div>
      </div>

      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </Card.Text>
        <div className="button-group">
          <button
            className="mr-10 flex flex-row"
            onClick={() => onLike(post._id)}
          >
            Like
            <span className="ml-1 mt-0.5 text-lg">
              <BiSolidLike />
            </span>
          </button>
          <button
            className="ml-10 flex flex-row"
            onClick={() => onDelete(post._id)}
          >
            Delete
            <span className="ml-1 mt-0.5 text-lg">
              <MdDelete />
            </span>
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};
