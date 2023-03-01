import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { thunkLoadNotebookNotes } from '../../store/notes';
import TextNoteCard from '../NotesComponents/TextNoteCard/TextNoteCard';
import NotebookHeader from './NotebookHeader';

const TextNotebook = ({notebook, setNotebookAdded, editState}) => {

    const notes = useSelector(state => state.notes?.notebookNotes)
    const [noteList, setNoteList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkLoadNotebookNotes(notebook?.id))
    }, [dispatch, notebook])

    useEffect(() => {
        if (notes) {
            setNoteList(Object.values(notes))
        }
    }, [notes])

    return (
        <div className ="text-notebook-display">
            <NotebookHeader setNotebookAdded={setNotebookAdded} notebook={notebook} editState={editState}/>
            {noteList?.length
                ?
                noteList.map((note) => {
                    return <TextNoteCard key={note.id} note={note}/>})
                : null}
        </div>
    )
};

export default TextNotebook;
