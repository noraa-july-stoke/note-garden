//=======================================================================
//  ______              _    _____              _
//  | ___ \            | |  |_   _|            | |
//  | |_/ /  ___   ___ | |_   | |    ___ __  __| |_
//  |  __/  / _ \ / __|| __|  | |   / _ \\ \/ /| __|
//  | |    | (_) |\__ \| |_   | |  |  __/ >  < | |_
//  \_|     \___/ |___/ \__|  \_/   \___|/_/\_\ \__|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useContext, useEffect } from "react";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
// import DeleteButton from '../../Buttons/DeleteButton';
// HELPERS
// CONTEXTS
import { ColorContext } from "../../../context/ColorContext";
// STYLES
import "./PostText.css";

const PostText = ({ TEXT, onUpdate }) => {
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
    <div className="text-note-card-container">
      {/* <div className="note-header-container" style={{ backgroundColor: bgColor}}>
                    </div> */}
      <div
        dangerouslySetInnerHTML={{ __html: TEXT }}
        className="text-note-body"
      />
      {/* <div className="text-note-footer">
                    <DeleteButton type={"TEXT_NOTE"} setIsDeleted={{setIsDeleted}} id={note?.id} />
                    </div> */}
    </div>
  );
};

export default PostText;
