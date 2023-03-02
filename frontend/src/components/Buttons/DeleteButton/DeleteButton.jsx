import {useEffect} from 'react';
import { DeleteReducer } from "./button-helpers";
import "./DeleteButton.css";


//reusable delete button for deleting literally anything out of my database that i want
const DeleteButton = ({type, setIsDeleted, notebookId}) => {
    const onClick = DeleteReducer(type, setIsDeleted, notebookId);
    useEffect(() => {
    }, [onClick])
    return <button onClick={onClick}>DELETE</button>
}

export default DeleteButton;
