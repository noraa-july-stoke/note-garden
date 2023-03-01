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
}};

const actionCreateNotebook = (notebook) => {
    return {
        type: ADD_NOTEBOOK,
        notebook
}};



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

export const thunkAddTextNotebook = (notebookData) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/notebooks/text-notebook", {
            method: "POST",
            body: JSON.stringify(notebookData),
        });
        const data = await response.json();
        dispatch(actionCreateNotebook(data));
    } catch (error) {
        console.error("Error creating notebook:", error);
        dispatch(actionError(error));
    }
};

const initialState = { userTextNotebooks: {}, userImageNotebooks: {}, collabsNoteBook: {} };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_NOTEBOOKS: {
            console.log("ACTIONS", action)

            return {
                userTextNotebooks: { ...action.notebooks.textNotebooks },
                userImageNotebooks: { ...action.notebooks.imageNotebooks },
                collabsNoteBook: { ...action.notebooks.collabsNotebook }
            }
        };
        case ADD_NOTEBOOK:
            return {...state}
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
