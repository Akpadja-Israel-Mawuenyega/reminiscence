import {
  fetchPosts,
  createAPost,
  updateAPost,
  deleteAPost,
  likeAPost,
} from "../api/api";

// import action type constants
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  LIKE_SUCCESS,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../constants/actionTypes";

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REQUEST });

    const { data } = await fetchPosts();

    dispatch({ type: FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: FETCH_FAILURE, payload: error.message });
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REQUEST });

    const { data } = await createAPost(newPost);

    dispatch({ type: CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: CREATE_FAILURE, payload: error.message });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST });

    const { data } = await updateAPost(id, post);

    dispatch({ type: UPDATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: UPDATE_FAILURE, payload: error.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });
    await deleteAPost(id);

    dispatch({ type: DELETE_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);

    dispatch({ type: DELETE_FAILURE, payload: error.message });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await likeAPost(id);

    dispatch({ type: LIKE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
