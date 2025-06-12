import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import posts from "./routes/posts.js";

// express instance
const app = express();

dotenv.config();

const port = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

// mongoose
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log(err));

// body parser
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cors instance
app.use(cors());

// routes
app.use("/posts", posts);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
