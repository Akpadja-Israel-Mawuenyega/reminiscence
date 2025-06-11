import axios from "axios";

const url = "http://localhost:8000/posts";

export const fetchPosts = () => {
  return axios.get(url);
};

export const createAPost = (newPost) => {
  return axios.post(url, newPost);
};

export const updateAPost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost);
};

export const deleteAPost = (id) => {
  return axios.delete(`${url}/${id}`);
};
