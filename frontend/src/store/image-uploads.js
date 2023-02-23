import { csrfFetch } from './csrf';

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
    } catch (error) {
        dispatch({ type: UPLOAD_IMAGE_FAILED, payload: error });
    }
};

const initialState = {
    status: 'idle',
    error: null
};

const imageReducer = (state = initialState, action) => {
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

export default imageReducer;
