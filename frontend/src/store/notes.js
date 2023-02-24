import { csrfFetch } from "./csrf";
const LOAD_NOTES = "LOAD_NOTES";
const SAVE_NOTE = "SAVE_NOTE"

const actionLoadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes,
});

export const thunkLoadNotes = () => async (dispatch) => {
    try {
        const response = await  csrfFetch("/api/notes/all-notes", {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadNotes(data));
    } catch (error) {
        console.error("Error loading notes:", error);
    }
};

export const thunkSaveNote = (note) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/notes/text-notes", {
            method: "POST",
            body: note
        });
        const data = await response.json();
        dispatch(actionLoadNotes(data));
    } catch (error) {
        console.error("Error saving note:", error);
    }
}

const initialState = {
    notes: {},
    loading: false,
    error: null,
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:
            return {
                ...state,
                notes: action.notes,
                loading: false,
                error: null,
            };

        case SAVE_NOTE:
            return {...state};
        default:
            return state;
    }
};


export default notesReducer;
