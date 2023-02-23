import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'ADD_NOTEBOOK';

const actionLoadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    };
};

export const thunkLoadUserNotebooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebooks');
    let data;
    if (response.ok) {
        data = await response.json();
        const userNotebooks = {};
        const collabNotebooks = {};
        data.forEach((notebook) => {
            if (notebook.isCollaborative) {
                collabNotebooks[notebook.id] = notebook;
            } else {
                userNotebooks[notebook.id] = notebook;
            }
        });
        dispatch(actionLoadNotebooks({ userNotebooks, collabNotebooks }));
    }
};

const initialState = { userNotebooks: {}, collabNotebooks: {} };

const notebookReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_NOTEBOOKS:
            return {
                ...state,
                userNotebooks: action.notebooks.userNotebooks,
                collabNotebooks: action.notebooks.collabNotebooks
            };
        case ADD_NOTEBOOK:
            return state;
        default:
            return state;
    }
};

export default notebookReducer;
