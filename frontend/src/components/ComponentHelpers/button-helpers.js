import {useDispatch} from 'react-redux';
import { thunkLoadNotebooks, thunkDeleteTextNotebook } from "../../store/notebooks";
import { thunkDeleteTextNote } from '../../store/notes';
//I had to define this as a function component to make it work;
export const DeleteReducer = (type, setIsDeleted, id) => {
    const dispatch = useDispatch();

    switch (type) {
        //returns the items necessary to build a delete text notebook button
        case "TEXT_NOTEBOOK": {
            const onClick = async (e) => {
                e.preventDefault();
                dispatch(thunkDeleteTextNotebook(id));
                dispatch(thunkLoadNotebooks());
                setIsDeleted(true)
            };
            const className = "delete-notebook-button";
            const deleteText = "DELETE NOTEBOOK";
            return {deleteText, className, onClick};
        }

        //returns the items necessary to build a delete textnote button
        case "TEXT_NOTE": {
            const onClick = async (e) => {
                e.preventDefault();
                dispatch(thunkDeleteTextNote(id));
                setIsDeleted(true);
            };
            const className = "delete-text-note-button";
            const deleteText = "DELETE NOTE";
            return {deleteText, className, onClick};
        }

        default: // "null case";
            return {deleteText: null, className: null, onClick: () => {}}; // null case with "null function";
    }
};
