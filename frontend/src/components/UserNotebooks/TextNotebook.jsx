import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebookNotes } from '../../store/notes';
import TextNoteCard from '../NotesComponents/TextNoteCard/TextNoteCard';
import NotebookHeader from './NotebookHeader';
import DeleteButton from "../Buttons/DeleteButton";
import TextEditor from '../TextEditor';

const TextNotebook = ({ notebook, setNotebookAdded, editState, deletedState, tabState }) => {
    const notes = useSelector(state => state.notes?.notebookNotes);
    const [noteList, setNoteList] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [edited, setEdited] = useState(false)
    const dispatch = useDispatch();
    const {activeTab, setActiveTab} = tabState;
    const { isDeleted , _ } = deletedState;

    useEffect(() => {
        dispatch(thunkLoadNotebookNotes(notebook?.id))
        setEdited(false)
        if (isDeleted) setActiveTab(0)
    }, [dispatch, notebook, edited, isDeleted]);

    useEffect(() => {
        if (notes) {
            setNoteList(Object.values(notes))
        }
    }, [notes]);

    const handleNoteDoubleClick = (note) => {
        setSelectedNote(note);
    }

    const handleEditorClose = () => {
        setSelectedNote(null);
    }

    return (
        <div className="text-notebook-display">
            <NotebookHeader setNotebookAdded={setNotebookAdded} notebook={notebook} editState={editState} />
            { activeTab !==0 && <DeleteButton type={"TEXT_NOTEBOOK"} deletedState={deletedState} id={notebook?.id}/>}
            {selectedNote ?
                <TextEditor note={selectedNote} onClose={handleEditorClose} setEdited={setEdited} /> :
                noteList?.length ?
                    noteList.map((note) => {
                        return <TextNoteCard key={note.id} deleteState={deletedState} note={note} onDoubleClick={() => handleNoteDoubleClick(note)} />
                    }) : null}
        </div>
    )
};

export default TextNotebook;
