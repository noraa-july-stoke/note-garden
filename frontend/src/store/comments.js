import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'LOAD_COMMENTS';

const actionLoadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    };
};

export const thunkLoadComments = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadComments(data));
        console.log(data)
    } catch (error) {
        console.error("Error loading comments", error);
    }
};

const initialState = { userComments: {} };

const commentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_COMMENTS: {
            return { userComments: { ...action.comments } }
        }
        default:
            return state;
    }
};

export default commentsReducer;
