export const addNotebook = () => {
    return { type: 'ADD_NOTEBOOK' };
}

export const edit = (boolean) => {
    return { type: 'EDIT', payload: boolean };
}

export const editing = (boolean) => {
    return { type: 'EDITING', payload: boolean };
}

export const deleteNotebook = () => {
    return { type: 'DELETE'};
}

export const setActiveTab = (tabIndex) => {
    return { type: 'SET_ACTIVE_TAB', payload: tabIndex };
}

export const resetNotebooks = () => {
    return { type: 'RESET'}
}

export const initialState = {
    notebookAdded: false,
    edited: false,
    editing: false,
    deleted: false,
    activeTab: 0
};

export const notebookReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTEBOOK':
            return { ...state, notebookAdded: !state.notebookAdded };
        case 'EDIT':
            return { ...state, edited: action.payload };
        case 'EDITING':
            return { ...state, editing: action.payload };
        case 'DELETE':
            return { ...state, deleted: !state.deleted};
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };
        case "RESET":
            return { ...initialState, activeTab: state.activeTab };
        default:
            return state;
    }
}
