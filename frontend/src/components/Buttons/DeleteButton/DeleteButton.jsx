import {useEffect} from 'react';
import { DeleteReducer } from '../../ComponentHelpers/button-helpers';
import "./DeleteButton.css";

//reusable delete button for deleting anything out of my database
const DeleteButton = ({type, setIsDeleted, id}) => {
    const onClick = DeleteReducer(type, setIsDeleted, id);
    useEffect(() => {
    }, [onClick])
    return <button onClick={onClick}>DELETE</button>
}

export default DeleteButton;
