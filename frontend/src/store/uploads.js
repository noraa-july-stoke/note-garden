import { csrfFetch } from './csrf';

//!@#$ needs refactored to iclude action creators.

// any route that uploads something will be called from here instead of
// the reducer associates with the item type.
const UPLOAD_IMAGE_PENDING = 'UPLOAD_IMAGE_PENDING';
const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
const UPLOAD_IMAGE_FAILED = 'UPLOAD_IMAGE_FAILED';

export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_IMAGE_PENDING });
        const response = await csrfFetch('/api/notes/image-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        const data = await response.json();
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: UPLOAD_IMAGE_FAILED, payload: error });
    }
};

const initialState = {
    status: 'idle',
    error: null
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_PENDING:
            return {
                ...state,
                status: 'loading',
                error: null
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                status: 'succeeded'
            };
        case UPLOAD_IMAGE_FAILED:
            return {
                ...state,
                status: 'failed',
                error: action.payload
            };
        default:
            return state;
    }
};

export default uploadReducer;
