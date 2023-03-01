import React, { useState, useEffect } from "react";
import NotebookForm from "../CreateForms/NotebookForm";
const NotebookHeader = ({ notebook, setNotebookAdded, editState}) => {
    const { isEditing, setIsEditing } = editState ? editState : { isEditing: false, setIsEditing: () => { } };
    const handleDoubleClick = () => {
        setIsEditing(true);
    }

    useEffect(() => {
    }, [isEditing])

    return (
        <div>
            {
                isEditing
                    ? (<NotebookForm notebook={notebook} setNotebookAdded={setNotebookAdded} editState={editState} />)
                    : (<h3 onDoubleClick={handleDoubleClick}>{notebook?.name}</h3>)
            }
        </div>
    );
}

export default NotebookHeader;
