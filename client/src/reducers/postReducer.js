// reducers/posts.js
const initialState = {
  posts: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, posts: action.payload, isLoading: false };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false };
    case "CREATE_REQUEST": {
      return { ...state, isCreating: true };
    }
    case "CREATE_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        isCreating: false,
      };
    case "CREATE_FAILURE": {
      return { ...state, isCreating: false };
    }
    case "UPDATE_REQUEST": {
      return { ...state, isUpdating: true };
    }
    case "UPDATE_SUCCESS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isUpdating: false,
      };
    case "UPDATE_FAILURE": {
      return { ...state, isUpdating: false };
    }
    case "LIKE_SUCCESS": {
      let liked = false;
      const likedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          if (post.likeCount !== action.payload.likeCount) {
            liked = true;
            return { ...post, likeCount: action.payload.likeCount };
          }
          return post;
        }
        return post;
      });
      return {
        ...state,
        posts: liked ? likedPosts : state.posts,
      };
    }
    case "DELETE_REQUEST": {
      return { ...state, isDeleting: true };
    }
    case "DELETE_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        isDeleting: false,
      };
    case "DELETE_FAILURE": {
      return { ...state, isDeleting: false };
    }
    default:
      return state;
  }
};

export default postsReducer;
