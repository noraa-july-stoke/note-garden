import React from 'react';
import "./TextNoteCard.css";


const TextNoteCard = ({ note, onDoubleClick }) => {
    return (
        <div onDoubleClick={onDoubleClick} className="text-note-card-container" >
        <div dangerouslySetInnerHTML={{ __html: note?.note }} />
        </div>
    );
};

export default TextNoteCard;
