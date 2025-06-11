import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, updatePost } from "../../actions/actions";
import ImageUploader from "../ImageUploader/ImageUploader";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PostForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const [base64Image, setBase64Image] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const clear = () => {
    setInputValue("");
    setBase64Image("");
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      setPostData((postData) => ({
        ...postData,
        tags: [...postData.tags, inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = postData.tags.filter((_, i) => i !== index);
    setPostData((postData) => ({
      ...postData,
      tags: newTags,
    }));
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else if (currentId) {
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
      });
    }
  }, [post, currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      try {
        dispatch(updatePost(currentId, postData));
        dispatch(getPosts());
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center align-items-center w-full"
    >
      <h2 className="p-2">{currentId ? "Edit" : "Create"} a memory</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Creator"
        className="mb-3 w-4/5"
      >
        <Form.Control
          className="creator-input"
          type="text"
          placeholder="Creator..."
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Title"
        className="title-label mb-3 w-4/5"
      >
        <Form.Control
          className="title-input"
          type="text"
          placeholder="Title..."
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Message"
        className="mb-3 w-4/5 message-label"
      >
        <Form.Control
          className="message-input"
          type="text"
          placeholder="Message..."
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          required
        />
      </FloatingLabel>
      <div className="tag-input-container mb-3 w-4/5">
        {postData.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="tag-remove-button"
            >
              x
            </button>
          </span>
        ))}
        <input
          className="tag-input w-full"
          type="text"
          placeholder="Add a tag..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="ml-4">
        <ImageUploader
          setPostData={setPostData}
          base64Image={base64Image}
          setBase64Image={setBase64Image}
        />
      </div>
      <Button
        className="submit-button mb-3 mt-3 w-3/5"
        variant="primary"
        type="submit"
        size="lg"
      >
        <span className="font-medium">SUBMIT</span>
      </Button>
      <Button
        className="w-3/5"
        variant="danger"
        size="lg"
        onClick={() => clear()}
      >
        <span className="font-medium">CLEAR</span>
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  currentId: PropTypes.string,
  setCurrentId: PropTypes.func.isRequired,
};

export default PostForm;
