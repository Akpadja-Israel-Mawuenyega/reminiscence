import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;
