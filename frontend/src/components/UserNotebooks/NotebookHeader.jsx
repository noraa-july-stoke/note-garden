import React, { useState, useEffect, useContext } from "react";
import NotebookForm from "../CreateForms/NotebookForm";
import {ColorContext} from '../../context/ColorContext';

const NotebookHeader = ({ notebook, notebooksController }) => {
    const {bgColor} = useContext(ColorContext);
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
        <div className="notebook-header" style={{backgroundColor: bgColor}}>
            {
                notebookState.editing
                    ? (<NotebookForm notebook={notebook} notebooksController={notebooksController}  />)
                    : (<h3 className='notebook-header-title' onDoubleClick={handleDoubleClick}>{notebook?.name}</h3>)
            }

        </div>
    );
}


export default NotebookHeader;
