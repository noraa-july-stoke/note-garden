import { csrfFetch } from "./csrf";

const LOAD_NOTES = "LOAD_NOTES";
const LOAD_NOTEBOOK_NOTES = "LOAD_NOTEBOOK_NOTES";
const LOAD_SINGLE_NOTE = "LOAD_SINGLE_NOTE";
const CREATE_TEXT_NOTE = "CREATE_TEXT_NOTE";
const EDIT_TEXT_NOTE = "EDIT_TEXT_NOTE";
const DELETE_TEXT_NOTE = "DELETE_TEXT_NOTE";
const ERROR = "ERROR";

const actionLoadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
});

const actionLoadNotebookNotes = (notes) => ({
    type: LOAD_NOTEBOOK_NOTES,
    notes
});

const actionLoadSingleNote = (note) => ({
    type: LOAD_SINGLE_NOTE,
    note
});

const actionCreateTextNote = (singleNote) => ({
    type: CREATE_TEXT_NOTE,
    singleNote
});

const actionEditTextNote = (singleNote) => ({
    type: EDIT_TEXT_NOTE,
    singleNote
});

const actionDeleteTextNote = (noteId) => ({
    type: DELETE_TEXT_NOTE,
    noteId

});

const actionError = (errors) => ({
    type: ERROR,
    errors
});

//Loads user's imagenotes and textnotes
export const thunkLoadNotes = () => async (dispatch) => {
    try {
        const { data } = await csrfFetch("/api/notes", {
            method: "GET"
        });
        dispatch(actionLoadNotes(data));
    } catch (error) {
        console.error("Error loading notes:", error);
        dispatch(actionError(error));
    }
};

//Loads Notes from a single notebook.
//Loads Notes from a single notebook.
export const thunkLoadNotebookNotes = (notebookId) => async (dispatch) => {
    try {
        const { data } = await csrfFetch(`/api/notebooks/text-notebooks/${notebookId}`, {
            method: "GET"
        });
        dispatch(actionLoadNotebookNotes(data));
    } catch (error) {
        console.error("Error loading notebook notes:", error);
        dispatch(actionError(error));
    }
};

// Loads a single note.
export const thunkLoadSingleNote = (noteId) => async (dispatch) => {
    try {
        const { data } = await csrfFetch(`/api/notes/text-notes/${noteId}`, {
            method: "GET"
        });
        dispatch(actionLoadSingleNote(data));
    } catch (error) {
        console.error("Error loading single note:", error);
        dispatch(actionError(error));
    }
}

//creates a new note and sends it to DB & updates state with new note
export const thunkCreateTextNote = (note) => async (dispatch) => {
    try {
        const { data } = await csrfFetch("/api/notes/text-note", {
            method: "POST",
            body: JSON.stringify({ note })
        });
        dispatch(actionCreateTextNote(note))
    } catch (error) {
        console.error("Error saving new note:", error);
        dispatch(actionError(error));
    }
}


export const thunkEditTextNote = (note) => async (dispatch) => {
    try {
        const { data } = await csrfFetch(`/api/notes/text-note/${note.id}`, {
            method: "PUT",
            body: JSON.stringify({ note })
        });
        dispatch(actionEditTextNote(data))
    } catch (error) {
        console.error("Error editing note:", error);
        dispatch(actionError(error));
    }
}

export const thunkDeleteTextNote = (noteId) => async (dispatch) => {
    try {
        const { data } = await csrfFetch(`/api/notes/text-note/${noteId}`, {
            method: "DELETE"
        });
        dispatch(actionDeleteTextNote(noteId))
    } catch (error) {
        console.error("Error deleting note:", error);
        dispatch(actionError(error));
    }

};

const initialState = {
    textNotes: {},
    imageNotes: {},
    notebookNotes: {},
    singleNote: null,
    errors: {},
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES: {
            return {
                textNotes: { ...action.notes.textNotes },
                imageNotes: { ...action.notes.imageNotes },
                notebookNotes: { ...state.notebookNotes },
                singleNote: { ...state.singleNote },
            };
        }

        case LOAD_NOTEBOOK_NOTES: {
            return {
                textNotes: { ...state.textNotes },
                imageNotes: { ...state.imageNotes },
                notebookNotes: { ...action.notes },
                singleNote: { ...state.singleNote },
            };
        }

        case LOAD_SINGLE_NOTE: {
            return {
                textNotes: { ...state.textNotes },
                imageNotes: { ...state.imageNotes },
                notebookNotes: { ...state.notebookNotes },
                singleNote: { ...action.note },
            };
        }

        case CREATE_TEXT_NOTE: {
            return {
                textNotes: { ...state.textNotes },
                imageNotes: { ...state.imageNotes },
                notebookNotes: { ...state.notebookNotes },
                singleNote: { ...action.singleNote },
            };
        }

        case EDIT_TEXT_NOTE: {
            return {
                textNotes: { ...state.textNotes },
                imageNotes: { ...state.imageNotes },
                notebookNotes: { ...state.notebookNotes },
                singleNote: { ...action.singleNote },
            };
        }

        case DELETE_TEXT_NOTE: {
            const textNotes = { ...state.textNotes };
            const notebookNotes = {...state.notebookNotes}
            delete textNotes[action.noteId];
            delete notebookNotes[action.noteId];

            console.log(action.noteId, notebookNotes)
            return {
                textNotes: {...textNotes},
                imageNotes: { ...state.imageNotes },
                notebookNotes: { ...notebookNotes },
                singleNote: { ...action.noteId },
            };
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

export default notesReducer;
