import { csrfFetch } from "./csrf";

const LOAD_POSTS = "LOAD_POSTS";
const LOAD_PAL_POSTS = "LOAD_PAL_POSTS";

const ERROR = "ERROR";

const actionError = (errors) => ({
    type: ERROR,
    errors
});

const actionLoadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const actionLoadPalPosts = (palPosts) => ({
    type: LOAD_PAL_POSTS,
    palPosts
});

export const thunkLoadPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadPosts(data));
    } catch (error) {
        console.error("Error loading posts", error);
        dispatch(actionError(error))
    }
}

export const thunkLoadPalPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/pals`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadPalPosts(data));
    } catch (error) {
        console.error("Error loading posts", error);
        dispatch(actionError(error))
    }
}

const initialState = { userPosts: {}, palPosts: {} };
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return { ...state, userPosts: { ...action.posts } }
        }
        case LOAD_PAL_POSTS: {
            return { ...state, palPosts: { ...action.palPosts } }
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
