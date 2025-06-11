import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../actions/actions";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import "./Post.css";

const Post = ({ post, setCurrentId }) => {
  const [showBackground, setShowBackground] = useState(false);
  const dispatch = useDispatch();
  const { isDeleting } = useSelector((state) => state.posts);

  const handleMoreOptionsClick = () => {
    setShowBackground(true);
    setTimeout(() => {
      setShowBackground(false);
    }, 300);
    setCurrentId(post._id);
  };

  const onLike = (id) => {};

  const onDelete = (id) => {
    dispatch(deletePost(id));
  };

  const parallelogramClipPath = "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)";

  return (
    <Card style={{ width: "18rem" }}>
      <div className="image-container" style={{ position: "relative" }}>
        <Card.Img variant="top" src={post.selectedFile || } />
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
        <Card.Text>
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </Card.Text>
        <Card.Title>{post.title}</Card.Title>
        <div className="mt-3 border-t-2 border-gray-400">
          <small>{post.message}</small>
        </div>

        {/* --- Button Group for Like and Delete --- */}
        <div className="button-group flex justify-around mt-3">
          {/* --- Like Button (Parallelogram with Border) --- */}
          <div className="relative w-28 h-10">
            <button
              className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white font-bold text-lg uppercase overflow-hidden rounded"
              style={{ clipPath: parallelogramClipPath }}
              disabled
            ></button>
            {/* Content Layer (Actual Clickable Button) */}
            <button
              className={`
                absolute inset-px
                flex items-center justify-center
                bg-purple-500 text-white font-semibold text-sm
                uppercase cursor-pointer
                hover:bg-blue-700 transition-colors duration-300
                z-10 rounded
              `}
              style={{ clipPath: parallelogramClipPath }}
              onClick={() => onLike(post._id)}
            >
              Like
              <span className="ml-1 mt-0.5 text-lg">
                <BiSolidLike />
              </span>
            </button>
          </div>
          {/* --- Delete Button (Parallelogram with Border) --- */}
          <div className="relative w-28 h-10">
            <button
              className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white font-bold text-lg uppercase overflow-hidden rounded"
              style={{ clipPath: parallelogramClipPath }}
              disabled
            ></button>
            {/* Content Layer (Actual Clickable Button) */}
            <button
              className={`
                absolute inset-px
                flex items-center justify-center
                bg-purple-600 text-white font-semibold text-sm
                uppercase cursor-pointer
                hover:bg-red-700 transition-colors duration-300
                z-10 rounded
              `}
              style={{ clipPath: parallelogramClipPath }}
              onClick={() => onDelete(post._id)}
            >
              {isDeleting ? "Deleting" : "Delete"}{" "}
              <span className="ml-1 mt-0.5 text-lg">
                <MdDelete />
              </span>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};
