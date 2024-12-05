import postMessage from "../models/postMessage.js";

// get all posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get a single post
export const getPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await postMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found." });
  }
};

// create a post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);

  // save the new post

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: "Error while creating post." });
  }
};
