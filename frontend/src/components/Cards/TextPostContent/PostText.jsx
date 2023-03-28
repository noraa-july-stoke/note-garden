import React, { useState, useContext, useEffect } from 'react';
import "./PostText.css";
// import DeleteButton from '../../Buttons/DeleteButton';
import { ColorContext } from '../../../context/ColorContext';

const TextPost = ({ TEXT, onUpdate }) => {
    const { bgColor, textColor } = useContext(ColorContext);
    // const [isDeleted, setIsDeleted] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);

    // useEffect(() => {
    // }, [isDeleted, isEditing])

    // const handleDoubleClick = () => {
    //     setIsEditing(true);
    // }

    // const onClick = () => {
    //     setIsEditing(true);
    // }

    // const onClose = () => {
    //     setIsEditing(false)
    // }


    return (
                <div  className="text-note-card-container" >
                    {/* <div className="note-header-container" style={{ backgroundColor: bgColor}}>
                    </div> */}
                    <div dangerouslySetInnerHTML={{__html:TEXT}} className='text-note-body' style={{ backgroundColor: "antiquewhite" }}/>
                    {/* <div className="text-note-footer">
                    <DeleteButton type={"TEXT_NOTE"} setIsDeleted={{setIsDeleted}} id={note?.id} />
                    </div> */}
                </div>
    );
};

export default TextPost;
