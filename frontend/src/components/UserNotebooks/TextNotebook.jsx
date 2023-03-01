import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { thunkLoadNotebookNotes } from '../../store/notes';

const TextNotebook = ({notebookId}) => {
    const notes = useSelector(state => state.notes?.notebookNotes)
    const [noteList, setNoteList] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkLoadNotebookNotes(notebookId))
    }, [dispatch, notebookId])

    useEffect(() => {
        if (notes) {
            setNoteList(Object.values(notes))
        }
    }, [notes])

    // console.log(notes, "NOTELIST", noteList)


    return (
        <div>
            {noteList?.length ? (
                noteList.map((note) => {
                    const innerHTML = { __html: note.note };
                    let element = (
                        <div key={note.id} dangerouslySetInnerHTML={innerHTML}></div>
                    );
                    return element;
                })
            ) : null}

        </div>
    )
};

export default TextNotebook;
