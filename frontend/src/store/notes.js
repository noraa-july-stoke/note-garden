import { csrfFetch } from "./csrf";
const LOAD_NOTES = "LOAD_NOTES";
const SAVE_NOTE = "SAVE_NOTE"
const LOAD_NOTES_FAILED = "LOAD_FAILED"

const actionLoadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
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

const initialState = {textNotes: {}, imageNotes: {}};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:
            console.log(action.notes)
            return {textNotes: {...action.notes.textNotes}, imageNotes: {...action.notes.imageNotes}};
        case SAVE_NOTE:
            return {...state};
        default:
            return state;
    }
};

export default notesReducer;
