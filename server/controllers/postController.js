import mongoose from "mongoose";
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
    const { id } = req.params;
    const post = await postMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found." });
    console.error(error);
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

// update an existing post
export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id ${_id}`);

    const updatedPost = await postMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
  }
};

// delete a post
export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send(`No post with id ${_id}`);
    }

    await postMessage.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
  }
};
