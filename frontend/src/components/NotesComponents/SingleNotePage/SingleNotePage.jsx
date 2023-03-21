import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { thunkLoadSingleNote } from "../../../store/notes";
const SingleNotePage = () => {
    const {noteId}= useParams();
    const dispatch = useDispatch();
    const singleNote = useSelector(state => state.notes?.singleNote);

    useEffect(() => {
        dispatch(thunkLoadSingleNote(noteId));
    }, [dispatch, noteId]);

    return null;
}

export default SingleNotePage;
