import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'ADD_NOTEBOOK';
const ERROR = "ERROR"


const actionError = (errors) => ({
    type: ERROR,
    errors
})


const actionLoadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    };
};



export const thunkLoadNotebooks = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/notebooks", {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadNotebooks(data));
    } catch (error) {
        console.error("Error loading notebooks:", error);
        dispatch(actionError(error));
    }
};

export const thunkAddNotebook = () => async (dispatch) => {
    return null
}

const initialState = { userTextNotebooks: {}, userImageNotebooks: {}, collabsNoteBook: {} };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_NOTEBOOKS: {
            return {
                userTextNotebooks: { ...action.textNotebooks },
                userImageNotebooks: { ...action.imageNotebooks },
                collabsNoteBook: { ...action.collabsNotebook }
            }
        };

        case ADD_NOTEBOOK:
        // return action.payload;
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

export default notebooksReducer;
