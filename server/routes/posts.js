import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postController.js";
const router = express.Router();

// get posts route
router.get("/", getPosts);

// get single post route
router.get("/:id", getPost);

// create post route
router.post("/", createPost);

// update post
router.patch("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

// like a post
router.patch("/:id/likes", likePost);

export default router;
