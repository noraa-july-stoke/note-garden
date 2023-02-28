import { csrfFetch } from "./csrf";

const LOAD_REACTIONS = "LOAD_REACTIONS";
const ERROR = "ERROR";

const actionError = (errors) => ({
    type: ERROR,
    errors
});

const actionLoadReactions = (reactions) => ({
    type: LOAD_REACTIONS,
    reactions
});

export const thunkLoadReactions = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reactions`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadReactions(data));
        console.log(data)
    } catch (error) {
        console.error("Error loading reactions", error);
        dispatch(actionError(error))
    }
}

const initialState = { userReactions: {} };
const reactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REACTIONS: {
            return { userReactions: { ...action.reactions } }
        }
        case ERROR: {
            return {
                ...state,
                errors: { ...action.errors }
            }
        }
        default:
            return state;
    }
};

export default reactionsReducer;
