import { csrfFetch } from "./csrf";

const LOAD_POST_REACTIONS = "LOAD_REACTIONS";
const ADD_REACTION = "ADD_REACTION";
const DELETE_REACTION = "DELETE_REACTION";
const ERROR = "ERROR";

const actionError = (errors) => ({
  type: ERROR,
  errors,
});

const actionLoadPostReactions = (reactions) => ({
  type: LOAD_POST_REACTIONS,
  reactions,
});

const actionAddReaction = (reaction) => ({
  type: ADD_REACTION,
  reaction,
});

const actionDeleteReaction = (reaction) => ({
  type: DELETE_REACTION,
  reaction,
});

export const thunkLoadPostReactions = (ids) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reactions?ids=${ids.join(",")}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(actionLoadPostReactions(data));
  } catch (error) {
    console.error("Error loading reactions", error);
    dispatch(actionError(error));
  }
};

export const thunkAddReaction = (reaction) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reactions`, {
      method: "POST",
      body: JSON.stringify(reaction),
    });
    const data = await response.json();
    dispatch(actionAddReaction(data));
  } catch (error) {
    console.error("Error adding reaction", error);
    dispatch(actionError(error));
  }
};

export const thunkDeleteReaction = (reaction) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reactions/${reaction.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    dispatch(actionDeleteReaction(data));
  } catch (error) {
    console.error("Error deleting reaction", error);
    dispatch(actionError(error));
  }
};

const initialState = { userReactions: {}, postReactions: {} };

const reactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_REACTIONS: {
      return { ...state, postReactions: { ...action.reactions } };
    }
    case ADD_REACTION: {
      const newReaction = {
        ...state.userReactions,
        [action.reaction.id]: action.reaction,
      };
      return { userReactions: newReaction };
    }
    case DELETE_REACTION: {
      const newReaction = { ...state.userReactions };
      delete newReaction[action.reaction.id];
      return { userReactions: newReaction };
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

export default reactionsReducer;
