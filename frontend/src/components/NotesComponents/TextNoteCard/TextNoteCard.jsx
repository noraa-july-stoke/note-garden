import React, { useState, useContext, useEffect } from 'react';
import "./TextNoteCard.css";
import DeleteButton from '../../Buttons/DeleteButton';
import { ColorContext } from '../../../context/ColorContext';
import TextEditor from '../../TextEditor';

const TextNoteCard = ({ note, onUpdate }) => {
    const { bgColor } = useContext(ColorContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
    }, [isDeleted, isEditing])

    const handleDoubleClick = () => {
        setIsEditing(true);
    }

    const onClose = () => {
        setIsEditing(false)
    }

    return (
        <>
            {isEditing ?
                <TextEditor note={note} onClose={onClose} setIsEditing={setIsEditing} onUpdate={onUpdate} /> :
                <div onDoubleClick={handleDoubleClick} className="text-note-card-container" >
                    <h4 className="note-name" style={{ backgroundColor: bgColor, color: "white" }}>{note.name}</h4>
                    <div dangerouslySetInnerHTML={{ __html: note?.note }} className='text-note-body' style={{ backgroundColor: "antiquewhite" }} />
                    <DeleteButton type={"TEXT_NOTE"} setIsDeleted={{setIsDeleted}} id={note?.id} />
                </div>
            }
        </>
    );
};

export default TextNoteCard;
