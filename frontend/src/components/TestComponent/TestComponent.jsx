
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadCollaborations } from '../../store/collaborations';
import { thunkLoadComments } from '../../store/comments';
import { thunkLoadNotes, thunkLoadNotebookNotes } from '../../store/notes';
import { thunkLoadNotebooks } from '../../store/notebooks';
import { thunkLoadPals } from '../../store/pals';
import { thunkLoadPalPosts, thunkLoadPosts } from '../../store/posts';
import { thunkLoadReactions } from '../../store/reactions';
import ExampleComponent from "./ExampleComponent";
import ImageUploadForm from '../Forms/ImageUploadForm';

const initialState = {
    notebookAdded: false,
    edited: false,
    deleted: false,
    activeTab: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_NOTEBOOK':
            return { ...state, notebookAdded: true };
        case 'EDIT':
            return { ...state, edited: true };
        case 'DELETE':
            return { ...state, deleted: true };
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };
        case "RESET":
            return { notebookAdded: false, edited: false, deleted: false, activeTab: state.activeTab };
        default:
            return state;
    }
}

const TestComponent = () => {

    const dispatch = useDispatch();

    const [state, exampleDispatch] = useReducer(reducer, initialState);

    const handleAddNotebook = () => {
        exampleDispatch({ type: 'ADD_NOTEBOOK' });
    };

    const handleEdit = () => {
        exampleDispatch({ type: 'EDIT' });
    };

    const handleDelete = () => {
        exampleDispatch({ type: 'DELETE' });
    };

    const handleSetActiveTab = (index) => {
        exampleDispatch({ type: 'SET_ACTIVE_TAB', payload: index });
    };

    const handleReset = () => {
        exampleDispatch({type: 'RESET'});
    };

    const collaborations = useSelector(state => state.collaborations);
    const comments = useSelector(state => state.comments);
    const notes = useSelector(state => state.notes)
    const notebooks = useSelector(state => state.notebooks)
    const pals = useSelector(state => state.pals)

    useEffect(() => {
        dispatch(thunkLoadCollaborations());
        dispatch(thunkLoadComments());
        dispatch(thunkLoadNotes());
        dispatch(thunkLoadNotebooks());
        dispatch(thunkLoadPals());
        dispatch(thunkLoadPosts());
        dispatch(thunkLoadReactions());
        dispatch(thunkLoadPalPosts());
    }, [dispatch]);
    return  (

        <>

            {/* <div>
                <button onClick={handleAddNotebook}>Add Notebook</button>
                <button onClick={handleEdit}>Edit Notebook</button>
                <button onClick={handleDelete}>Delete Notebook</button>
                <button onClick={handleReset}>Reset</button>

                <button onClick={() => handleSetActiveTab(0)}>Set Active Tab to 0</button>
                <button onClick={() => handleSetActiveTab(1)}>Set Active Tab to 1</button>

                <p>Notebook Added: {state.notebookAdded.toString()}</p>
                <p>Notebook Edited: {state.edited.toString()}</p>
                <p>Notebook Deleted: {state.deleted.toString()}</p>
                <p>Active Tab: {state.activeTab}</p>
            </div>

            <ExampleComponent /> */}
            <ImageUploadForm />
        </>


    )
}

export default TestComponent;
