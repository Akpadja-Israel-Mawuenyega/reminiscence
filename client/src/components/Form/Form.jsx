import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, updatePost } from "../../actions/actions";
import ImageUploader from "../ImageUploader/ImageUploader";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Form.css";

import tv_1 from "../../default_images/tv_1.webp";
import tv_2 from "../../default_images/tv_2.jpg";
import tv_3 from "../../default_images/tv_3.png";
import netflix_1 from "../../default_images/netflix_1.jpg";
import netflix_2 from "../../default_images/netflix_2.webp";
import netflix_3 from "../../default_images/netflix_3.jpg";
import sports_1 from "../../default_images/sports_1.jpg";
import sports_2 from "../../default_images/sports_2.png";
import sports_3 from "../../default_images/sports_3.webp";
import food_1 from "../../default_images/food_1.jpg";
import food_2 from "../../default_images/food_2.jpg";
import food_3 from "../../default_images/food_3.webp";
import travel_1 from "../../default_images/travel_1.jpg";
import travel_2 from "../../default_images/travel_2.jpg"; 
import travel_3 from "../../default_images/travel_3.avif";
import music_1 from "../../default_images/music_1.jpg";
import music_2 from "../../default_images/music_2.jpg";
import music_3 from "../../default_images/music_3.png";
import vg_1 from "../../default_images/vg_1.webp";
import vg_2 from "../../default_images/vg_2.jpg";
import vg_3 from "../../default_images/vg_3.jpg";
import generic_1 from "../../default_images/generic_1.jpg";
import generic_2 from "../../default_images/generic_2.jpg";
import generic_3 from "../../default_images/generic_3.png";

const defaultImages = {
  tv: [tv_1, tv_2, tv_3],
  netflix: [netflix_1, netflix_2, netflix_3],
  sports: [sports_1, sports_2, sports_3],
  food: [food_1, food_2, food_3],
  travel: [travel_1, travel_2, travel_3],
  music: [music_1, music_2, music_3],
  videogames: [vg_1, vg_2, vg_3],
  generic: [generic_1, generic_2, generic_3],
};

const getRandomElement = (arr) => {
  if (!arr || arr.length === 0) {
    console.warn("getRandomElement received an empty or null array.");
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

const determineDefaultImageSource = (tags) => {
  const postTags = tags || [];
  let foundDefaultImage = null;

  for (const postTag of postTags) {
    const lowerCasePostTag = postTag.toLowerCase();
    for (const category in defaultImages) {
      if (category === "generic") continue;

      const regex = new RegExp(category, "i");
      if (regex.test(lowerCasePostTag)) {
        if (defaultImages[category] && defaultImages[category].length > 0) {
          foundDefaultImage = getRandomElement(defaultImages[category]);
          break;
        }
      }
    }
    if (foundDefaultImage) {
      break;
    }
  }

  if (!foundDefaultImage) {
    foundDefaultImage = getRandomElement(defaultImages.generic);
  }
  return foundDefaultImage;
};

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

  const clear = useCallback(() => {
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
  }, [setBase64Image, setInputValue, setCurrentId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      setPostData((prevPostData) => ({
        ...prevPostData,
        tags: [...prevPostData.tags, inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = postData.tags.filter((_, i) => i !== index);
    setPostData((prevPostData) => ({
      ...prevPostData,
      tags: newTags,
    }));
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
      setBase64Image(post.selectedFile || "");
    } else if (currentId === null) {
      clear();
    }
  }, [post, currentId, clear]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataToSubmit = { ...postData };

    dataToSubmit.selectedFile = base64Image;

    if (!dataToSubmit.selectedFile || dataToSubmit.selectedFile === "") {
      const tagsArray = Array.isArray(dataToSubmit.tags)
        ? dataToSubmit.tags
        : String(dataToSubmit.tags)
            .split(",")
            .map((tag) => tag.trim());
      dataToSubmit.selectedFile = determineDefaultImageSource(tagsArray);
    }

    if (currentId) {
      try {
        dispatch(updatePost(currentId, dataToSubmit));
        dispatch(getPosts());
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    } else {
      dispatch(createPost(dataToSubmit));
      dispatch(getPosts());
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
        controlId="floatingInputCreator"
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
        controlId="floatingInputTitle"
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
        controlId="floatingInputMessage"
        label="Message"
        className="mb-3 w-4/5 message-label"
      >
        <Form.Control
          className="message-input"
          as="textarea"
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
      <Button className="w-3/5" variant="danger" size="lg" onClick={clear}>
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
