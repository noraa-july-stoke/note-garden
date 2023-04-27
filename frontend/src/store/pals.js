import { csrfFetch } from "./csrf";

const LOAD_PALS = "LOAD_PALS";
const ERROR = "ERROR";

const actionError = (errors) => ({
    type: ERROR,
    errors
});

const actionLoadPals = (pals) => ({
    type: LOAD_PALS,
    pals
})

export const thunkLoadPals = () => async(dispatch) => {
    try {
        const { data } = await csrfFetch(`/api/pals`, {
            method: "GET"
        });
        dispatch(actionLoadPals(data));
    } catch (error) {
        console.error("Error loading pals", error);
        dispatch(actionError(error))
    }
}


const initialState = { userPals: {} };
const palsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_PALS: {
            return { userPals: { ...action.pals } }
        }
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

export default palsReducer;
