import React, {useState, useEffect} from 'react';
import "./TextNoteCard.css";
import DeleteButton from '../../Buttons/DeleteButton';


const TextNoteCard = ({ note, onDoubleClick }) => {
    const [isDeleted, setIsDeleted ] = useState(false)
    const deletedState = {isDeleted, setIsDeleted}
    return (
        <div onDoubleClick={onDoubleClick} className="text-note-card-container" >
        <div dangerouslySetInnerHTML={{ __html: note?.note }} />
            <DeleteButton type={"TEXT_NOTE"} deletedState={deletedState} id={note?.id} />
        </div>
    );
};

export default TextNoteCard;
