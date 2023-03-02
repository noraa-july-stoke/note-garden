import {useEffect} from 'react';
import { DeleteReducer } from '../../ComponentHelpers/button-helpers';
import "./DeleteButton.css";

//reusable delete button for deleting anything out of my database
const DeleteButton = ({type, deletedState, id}) => {
    const {isDeleted, setIsDeleted } = deletedState;
    const {deleteText, className, onClick} = DeleteReducer(type, setIsDeleted, id);
    useEffect(() => {
    }, [onClick])
    return <button className={className} onClick={onClick}>{deleteText}</button>
}
export default DeleteButton;
