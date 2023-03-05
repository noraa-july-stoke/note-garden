import {useEffect, useContext} from 'react';
import { DeleteReducer } from '../../ComponentHelpers/button-helpers';
import "./DeleteButton.css";
import { ColorContext } from '../../../context/ColorContext';

//reusable delete button for deleting anything out of my database
const DeleteButton = ({type, onDelete, id}) => {
    const {bgColor} = useContext(ColorContext)
    if (!onDelete) onDelete = () => {} ;
    const {deleteText, className, onClick} = DeleteReducer(type, onDelete, id);
    useEffect(() => {
    }, [onClick])
    return <button className={className} onClick={onClick} style={{backgroundColor: bgColor}}>{deleteText}</button>
}

export default DeleteButton;
