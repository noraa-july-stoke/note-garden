import { csrfFetch } from "./csrf";
const LOAD_NOTES = "LOAD_NOTES";
const CREATE_NOTE = "SAVE_NOTE"
const LOAD_NOTES_FAILED = "LOAD_FAILED"

const actionLoadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
});

const actionCreateNote = (note) => ({
    type: CREATE_NOTE,
    note
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

export const thunkCreateNote = (note) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/notes/text-note", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({note})
        });
        const data = await response.json();
        console.log(data)
        // dispatch(actionCreateNote(data));
    } catch (error) {
        console.error("Error saving note:", error);
    }
}

const initialState = {textNotes: {}, imageNotes: {}, singleNote:{}};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:{
            console.log(action.notes)
            return {textNotes: {...action.notes.textNotes}, imageNotes: {...action.notes.imageNotes}, singleNote:{...state.singleNote}};
        }
        case CREATE_NOTE:
            return {
                textNotes: { ...state.textNotes },
                imageNotes: { ...state.imageNotes },
                singleNote: { ...state.singleNote }
            };
        default:
            return state;
    }
};

export default notesReducer;
