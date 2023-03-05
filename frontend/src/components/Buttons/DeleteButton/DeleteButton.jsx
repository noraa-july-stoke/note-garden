import {useEffect} from 'react';
import { DeleteReducer } from '../../ComponentHelpers/button-helpers';
import "./DeleteButton.css";

//reusable delete button for deleting anything out of my database
const DeleteButton = ({type, onDelete, id}) => {
    if (!onDelete) onDelete = () => {} ;
    const {deleteText, className, onClick} = DeleteReducer(type, onDelete, id);
    useEffect(() => {
    }, [onClick])
    return <button className={className} onClick={onClick}>{deleteText}</button>
}

export default DeleteButton;
