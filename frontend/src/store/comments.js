import { csrfFetch } from './csrf';

const LOAD_USER_COMMENTS = 'LOAD_USER_COMMENTS';
const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS';
const ERROR = "ERROR"


const actionError = (errors) => ({
    type: ERROR,
    errors
});


const actionLoadUserComments = (comments) => {
    return {
        type: LOAD_USER_COMMENTS,
        comments
    };
};

const actionLoadPostComments = (comments) => {
    return {
        type: LOAD_USER_COMMENTS,
        comments
    };
};


//==================================================================================
// Get all user's comments left on other user's posts
//==================================================================================
export const thunkLoadUserComments = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/user-comments`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadUserComments(data));
    } catch (error) {
        console.error("Error loading comments", error);
        dispatch(actionError(error))
    }
};


//==================================================================================
// Get all comments associated with posts in the user's feed from backend
//==================================================================================
export const thunkLoadPostComments = () => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/comments/feed-comments`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadPostComments(data));
    } catch (error) {
        console.error("Error loading comments", error);
        dispatch(actionError(error))
    }
};


const initialState = { userComments: {}, postComments: {}, singleComment: {} };
const commentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_USER_COMMENTS: {
            return {...state, userComments: { ...action.comments } }
        }

        case LOAD_POST_COMMENTS: {
            return state
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

export default commentsReducer;
