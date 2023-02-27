import { csrfFetch } from './csrf';

const LOAD_COLLABORATIONS = 'LOAD_COLLABORATIONS';

const actionLoadCollaborations = (collaborations) => {
    return {
        type: LOAD_COLLABORATIONS,
        collaborations
    };
};

export const thunkLoadCollaborations = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/collaborations`, {
            method: "GET"
        });
        const data = await response.json();
        dispatch(actionLoadCollaborations(data));
    } catch (error) {
        console.error("Error loading collaboration", error);
    }
}

const initialState = { userCollaborations: {}};

const collaborationsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD_COLLABORATIONS: {

            return {userCollaborations: {...action.collaborations}}
        }
        default:
            return state;
    }
};

export default collaborationsReducer;
