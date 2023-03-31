import { csrfFetch } from "./csrf";

const LOAD_POSTS = "LOAD_POSTS";
const ADD_POST = "ADD_POST";
const LOAD_PAL_POSTS = "LOAD_PAL_POSTS";

const ERROR = "ERROR";

const actionError = (errors) => ({
  type: ERROR,
  errors,
});

const actionLoadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const actionAddPost = (post) => ({
  type: ADD_POST,
  post,
});

const actionLoadPalPosts = (palPosts) => ({
  type: LOAD_PAL_POSTS,
  palPosts,
});

export const thunkLoadPosts = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(actionLoadPosts(data));
  } catch (error) {
    console.error("Error loading posts", error);
    dispatch(actionError(error));
  }
};

export const thunkAddPost = (content) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const data = await response.json();

    dispatch(actionAddPost(data));
  } catch (error) {
    console.error("Error adding post", error);
    dispatch(actionError(error));
  }
};

export const thunkLoadPalPosts = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/all-posts`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(actionLoadPalPosts(data));
  } catch (error) {
    console.error("Error loading posts", error);
    dispatch(actionError(error));
  }
};

const initialState = { userPosts: {}, palPosts: {}, singlePost: {} };
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS: {
      return { ...state, userPosts: { ...action.posts } };
    }
    case LOAD_PAL_POSTS: {
      return { ...state, palPosts: { ...action.palPosts } };
    }
    case ADD_POST: {
      const post = action.post;
      return {
        ...state,
        palPosts: {
          ...state.palPosts,
          [post.id]: post,
        },
      };
    }
    case ERROR: {
      return {
        ...state,
        errors: { ...action.errors },
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
