import { csrfFetch } from "./csrf";

const LOAD_POSTS = "LOAD_POSTS";
const ERROR = "ERROR";

const actionError = (errors) => ({
    type: ERROR,
    errors
});

const actionLoadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

export const thunkLoadPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadPosts(data));
        console.log(data)
    } catch (error) {
        console.error("Error loading posts", error);
        dispatch(actionError(error))
    }
}

const initialState = { userPosts: {} };
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return { userPosts: { ...action.posts } }
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

export default postsReducer;
