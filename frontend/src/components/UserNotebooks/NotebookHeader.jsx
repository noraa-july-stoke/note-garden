import React, { useState, useEffect } from "react";
import NotebookForm from "../CreateForms/NotebookForm";
const NotebookHeader = ({ notebook, setNotebookAdded, editState}) => {
    // this allows me to have the component pass through a render without breaking before state variables have been set.
    // if editState doesn't exist, it allows setisediting to still be a function that doesnt do anything. more or less
    // a temporary "null" value for the function.
    const { isEditing, setIsEditing } = editState ? editState : { isEditing: false, setIsEditing: () => {}};
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
