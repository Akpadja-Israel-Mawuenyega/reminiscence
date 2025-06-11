import { fetchPosts, createAPost, updateAPost, deleteAPost } from "../api/api";

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_REQUEST" });

    const { data } = await fetchPosts();

    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "FETCH_FAILURE", payload: error.message });
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_REQUEST" });

    const { data } = await createAPost(newPost);

    dispatch({ type: "CREATE_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "CREATE_FAILURE", payload: error.message });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_REQUEST" });

    const { data } = await updateAPost(id, post);

    dispatch({ type: "UPDATE_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "UPDATE_FAILURE", payload: error.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REQUEST" });
    await deleteAPost(id);

    dispatch({ type: "DELETE_SUCCESS", payload: id });
  } catch (error) {
    console.log(error);

    dispatch({ type: "DELETE_FAILURE", payload: error.message });
  }
};
