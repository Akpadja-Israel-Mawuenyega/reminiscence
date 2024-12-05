import express from "express";
import {
  getPosts,
  getPost,
  createPost,
} from "../controllers/postController.js";
const router = express.Router();

// get posts route
router.get("/", getPosts);

// get single post route
router.get("/:id", getPost);

// create post route
router.post("/", createPost);

export default router;
