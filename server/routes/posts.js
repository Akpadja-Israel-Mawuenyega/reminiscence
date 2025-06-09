import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
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

export default router;
