import React, { useState, useContext, useEffect } from 'react';
import "./TextNoteCard.css";
import DeleteButton from '../../Buttons/DeleteButton';
import { ColorContext } from '../../../context/ColorContext';
import TextEditor from '../../TextEditor';

const TextNoteCard = ({ note, onUpdate }) => {
    const { bgColor, textColor } = useContext(ColorContext);
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
                <TextEditor note={note} onClose={onClose} setIsEditing={setIsEditing} onUpdate={onUpdate} bgColor={bgColor} /> :
                <div onDoubleClick={handleDoubleClick} className="text-note-card-container" >
                    <div className="note-title-container" style={{ backgroundColor: bgColor}}>
                    <h4 className="note-name" style={{color: "white" }}>{note.name}</h4>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: note?.note }} className='text-note-body' style={{ backgroundColor: "antiquewhite" }} />
                    <div className="text-note-footer">
                    <DeleteButton type={"TEXT_NOTE"} setIsDeleted={{setIsDeleted}} id={note?.id} />
                    </div>
                </div>
            }
        </>
    );
};

export default TextNoteCard;
