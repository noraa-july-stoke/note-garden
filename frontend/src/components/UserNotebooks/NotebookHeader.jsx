import React, { useState, useEffect } from "react";
import NotebookForm from "../CreateForms/NotebookForm";
const NotebookHeader = ({ notebook, setNotebookAdded, editState}) => {
    // this allows me to have the component pass through a render without breaking before state variables have been set.
    // if editState doesn't exist, it allows setisediting to still be a function that doesnt do anything. more or less
    // a temporary "null" value for the function so that my useEffect doesnt break my code.
    const { isEditing, setIsEditing } = editState ? editState : { isEditing: false, setIsEditing: () => {}};

    useEffect(() => {
    }, [isEditing, setIsEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };
    return (
        <div>
            {
                isEditing
                    ? (<NotebookForm notebook={notebook} setNotebookAdded={setNotebookAdded} editState={editState} />)
                    : (<h3 onDoubleClick={handleDoubleClick}>{notebook?.name}</h3>)
            }
            <div className="component-instructions">Double Click the notebook title to edit. Double click a note to edit</div>

        </div>
    );
}

export default NotebookHeader;
