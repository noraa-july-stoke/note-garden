import React, { useState, useEffect } from "react";
import NotebookForm from "../CreateForms/NotebookForm";
const NotebookHeader = ({ notebook, notebooksController }) => {
    const {notebookDispatch, notebookState, notebookFunctions} = notebooksController;
    // this allows me to have the component pass through a render without breaking before state variables have been set.
    // if editState doesn't exist, it allows setisediting to still be a function that doesnt do anything. more or less
    // a temporary "null" value for the function so that my useEffect doesnt break my code.
    useEffect(() => {
    }, [notebookState.editing]);


    const handleDoubleClick = () => {
        notebookDispatch(notebookFunctions.editing(true))
    };

    return (
        <div className="notebook-header">
            {
                notebookState.editing
                    ? (<NotebookForm notebook={notebook} notebooksController={notebooksController}  />)
                    : (<h3 className='notebook-header-title' onDoubleClick={handleDoubleClick}>{notebook?.name}</h3>)
            }
            { notebook && <div className="component-instructions">Double Click the notebook title above to edit. Double click a note to edit</div>}

        </div>
    );
}


export default NotebookHeader;
