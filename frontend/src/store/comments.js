import { csrfFetch } from "./csrf";

const LOAD_USER_COMMENTS = "LOAD_USER_COMMENTS";
const LOAD_POST_COMMENTS = "LOAD_POST_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ERROR = "ERROR";

const actionError = (errors) => ({
  type: ERROR,
  errors,
});

const actionLoadUserComments = (comments) => {
  return {
    type: LOAD_USER_COMMENTS,
    comments,
  };
};

const actionLoadPostComments = (comments) => {
  return {
    type: LOAD_POST_COMMENTS,
    comments,
  };
};

const actionAddComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

const actionEditComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};

const actionDeleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment,
  };
};

//==================================================================================
// Get all user's comments left on other user's posts
//==================================================================================
export const thunkLoadUserComments = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/user-comments`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(actionLoadUserComments(data));
  } catch (error) {
    console.error("Error loading comments", error);
    dispatch(actionError(error));
  }
};

//==================================================================================
// Get all comments associated with posts in the user's feed from backend
//==================================================================================
export const thunkLoadPostComments = (ids) => async (dispatch) => {
  try {
    const { data } = await csrfFetch(
      `/api/comments/feed-comments?ids=${ids.join(",")}`,
      {
        method: "GET",
      }
    );
    dispatch(actionLoadPostComments(data));
  } catch (error) {
    console.error("Error loading comments", error);
    dispatch(actionError(error));
  }
};

//==================================================================================
// Add a new comment to a post
//==================================================================================
export const thunkAddComment = (comment) => async (dispatch) => {
  console.log(comment, "THUNK COMMENT!!!!!!")
  try {
    const { data } = await csrfFetch(`/api/comments`, {
      method: "POST",
      data: JSON.stringify(comment),
    });
    dispatch(actionAddComment(data));
  } catch (error) {
    console.error("Error adding comment", error);
    dispatch(actionError(error));
  }
};


//==================================================================================
// Add a new comment to a post !@#$ Might have pass-through issue
//==================================================================================
export const thunkEditComment = (comment) => async (dispatch) => {
  try {
    const { data } = await csrfFetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      data: JSON.stringify(comment),
    });
    dispatch(actionEditComment(comment));
  } catch (error) {
    console.error("Error adding comment", error);
    dispatch(actionError(error));
  }
};

export const thunkDeleteComment = (comment) => async (dispatch) => {
  try {
    const { data } = await csrfFetch(`/api/comments/${comment.id}`, {
      method: "DELETE",
    });
    // const data = await response.json();
    dispatch(actionDeleteComment(comment));
  } catch (error) {
    console.error("Error deleting comment", error);
    dispatch(actionError(error));
  }
};

const initialState = {
  userComments: {},
  postComments: {},
  singleComment: {},
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_COMMENTS: {
      return { ...state, userComments: { ...action.comments } };
    }
    case LOAD_POST_COMMENTS: {
      return { ...state, postComments: { ...action.comments } };
    }
    case ADD_COMMENT: {
      const postComments = { ...state.postComments };
      const comment = action.comment;
      postComments[comment.postId] = [...postComments[comment.postId], comment];
      return {
        ...state,
        postComments,
      };
    }

    case EDIT_COMMENT: {
      const postComments = { ...state.postComments };
      const comment = action.comment;
      const comments = postComments[comment.postId]?.map((c) =>
        c.id === comment.id ? comment : c
      );
      postComments[comment.postId] = comments;
      return {
        ...state,
        postComments,
      };
    }

    case DELETE_COMMENT: {
      const postComments = { ...state.postComments };
      const commentId = action.comment?.id;
      const postId = action.comment?.postId;
      const comments =
        postComments[postId]?.filter((comment) => comment.id !== commentId) ||
        [];
      postComments[postId] = comments;
      return {
        ...state,
        postComments,
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

export default commentsReducer;
