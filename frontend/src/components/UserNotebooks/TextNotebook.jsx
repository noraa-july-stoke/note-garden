import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadNotebookNotes } from '../../store/notes';
import TextNoteCard from '../NotesComponents/TextNoteCard/TextNoteCard';
import NotebookHeader from './NotebookHeader';
import DeleteButton from "../Buttons/DeleteButton";
import TextEditor from '../TextEditor';

const TextNotebook = ({ notebook, notebooksController}) => {
    const notes = useSelector(state => state.notes?.notebookNotes);
    const [noteList, setNoteList] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const dispatch = useDispatch();
    const {notebookState, notebookDispatch, notebookFunctions} = notebooksController;

    useEffect(() => {
        if (notebookState.activeTab !== 0) {
            dispatch(thunkLoadNotebookNotes(notebook?.id))
            // notebookDispatch(notebookFunctions.delete(false))
        }
    }, [dispatch, notebook?.id, notebookState.editing, notebookState.deleted]);

    useEffect(() => {
        if (notes) {
            setNoteList(Object.values(notes))
        }
    }, [notes]);

    const handleNoteDoubleClick = (note) => {
        setSelectedNote(note);
    }

    const onDelete = e => {
        notebookDispatch(notebookFunctions.deleteNotebook())
    }

    return (
        <div className="text-notebook-display">
            <NotebookHeader notebook={notebook} notebooksController={notebooksController} />
            {notebook?.id && <DeleteButton type={"TEXT_NOTEBOOK"} id={notebook?.id} onDelete={onDelete} />}
            {
                noteList?.length ?
                    noteList.map((note) => (
                        <TextNoteCard
                            key={note.id}
                            note={note}
                            onDoubleClick={() => handleNoteDoubleClick(note)}
                        />
                ))
                :null

            }
        </div>
    )
};
export default TextNotebook;
