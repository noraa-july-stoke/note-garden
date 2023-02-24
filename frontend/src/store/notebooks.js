import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'ADD_NOTEBOOK';

const actionLoadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    };
};


const initialState = { userNotebooks: {}, collabNotebooks: {} };

const notebookReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_NOTEBOOKS:
            return action.payload
        case ADD_NOTEBOOK:
            return action.payload;
        default:
            return state;
    }
};

export default notebookReducer;
