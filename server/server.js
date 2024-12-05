import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import posts from "./routes/posts.js";

const port = process.env.PORT || 5000;

// express instance
const app = express();

// mongoose
const CONNECTION_URL =
  "mongodb+srv://drimmaculate147:johnwick9@cluster0.tgpoq.mongodb.net/";

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
