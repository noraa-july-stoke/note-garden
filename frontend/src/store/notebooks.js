import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'ADD_NOTEBOOK';

const actionLoadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    };
};

export const thunkLoadNotebooks = () => async (dispatch) => {
return null
}

export const thunkAddNotebook = () => async (dispatch) => {
return null
}

const initialState = { userNotebooks: {}, collabsNoteBbok:{}};

const notebookReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_NOTEBOOKS:
            return {userNotebooks: {...action.payload.userNotebooks}, collabsNotebook:{...action.payload.collabsNotebook}}
        case ADD_NOTEBOOK:
            return action.payload;

        default:
            return state;
    }
};

export default notebookReducer;
