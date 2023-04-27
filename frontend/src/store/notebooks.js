import { csrfFetch } from "./csrf";

const LOAD_NOTEBOOKS = "LOAD_NOTEBOOKS";
const ADD_NOTEBOOK = "ADD_NOTEBOOK";
const DELETE_TEXT_NOTEBOOK = "DELETE_TEXT_NOTEBOOK";
const ERROR = "ERROR";

const actionError = (errors) => ({
  type: ERROR,
  errors,
});

const actionLoadNotebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    notebooks,
  };
};

const actionCreateNotebook = (notebook) => {
  return {
    type: ADD_NOTEBOOK,
    notebook,
  };
};

const actionDeleteTextNotebook = (notebookId) => {
  return {
    type: DELETE_TEXT_NOTEBOOK,
    notebookId,
  };
};

export const thunkLoadNotebooks = () => async (dispatch) => {
  try {
    const { data } = await csrfFetch("/api/notebooks", {
      method: "GET",
    });
    dispatch(actionLoadNotebooks(data));
  } catch (error) {
    console.error("Error loading notebooks:", error);
    dispatch(actionError(error));
  }
};

export const thunkAddTextNotebook =
  (notebookData, notebookId) => async (dispatch) => {
    if (!notebookId) {
      try {
        const { data } = await csrfFetch("/api/notebooks/text-notebook", {
          method: "POST",
          body: JSON.stringify(notebookData),
        });
        dispatch(actionCreateNotebook(data));
      } catch (error) {
        console.error("Error creating notebook:", error);
        dispatch(actionError(error));
      }
    } else {
      try {
        const { data } = await csrfFetch(
          `/api/notebooks/text-notebook/${notebookId}`,
          {
            method: "PUT",
            body: JSON.stringify(notebookData),
          }
        );
        dispatch(actionCreateNotebook(data));
      } catch (error) {
        console.error("Error creating notebook:", error);
        dispatch(actionError(error));
      }
    }
  };

// !@#$ might be a problem here where it goes through and deletes something out of state
// but there has been an error and the deletion didn't go through on the backend
export const thunkDeleteTextNotebook = (notebookId) => async (dispatch) => {
  try {
    const { data } = await csrfFetch(
      `/api/notebooks/text-notebook/${notebookId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(actionDeleteTextNotebook(notebookId));
  } catch (error) {
    console.error("Error deleting notebook:", error);
    dispatch(actionError(error));
  }
};

const initialState = {
  userTextNotebooks: {},
  userPhotoAlbums: {},
  collabsNoteBook: {},
  singleNotebook: {},
};
const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTEBOOKS:
      return {
        userTextNotebooks: { ...action.notebooks.textNotebooks },
        userPhotoAlbums: { ...action.notebooks.photoAlbums },
        collabsNoteBook: { ...action.notebooks.collabsNotebook },
      };
    case ADD_NOTEBOOK:
      return { ...state, singleNotebook: { ...action.payload } };
    case DELETE_TEXT_NOTEBOOK: {
      const newState = { ...state };
      delete newState.userTextNotebooks[action.notebookId];
      return newState;
    }
    case ERROR: {
      return {
        ...state,
        errors: { ...action.errors },
      };
    }
    default:
      return state;
  }
};

export default notebooksReducer;
