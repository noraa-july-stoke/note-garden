//=======================================================================
// HEADER HERE
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import DeleteButton from "../../Buttons/DeleteButton";
import CommentForm from "../../Forms/CommentForm/CommentForm";
// HELPERS
// THUNKS
// import { thunkDeleteComment } from "../../../store/comments";
// CONTEXTS
// STYLES
import "./Comment.css";
//=======================================================================
const Comment = ({ comment }) => {
  const user = useSelector((state) => state.session?.user);
  const [isEditing, setIsEditing] = useState(false);
  // const [editedComment, setEditedComment] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    // setEditedComment(comment);
  };

  return (
    <div
      className="comment-container"
      style={{ backgroundColor: "white", borderBottom: "1px solid black" }}>
      <div className="comment-buttons-container">
        {(comment.userId === user.id || comment.authorId === user.id) && (
          <DeleteButton type="COMMENT" toDelete={comment} />
        )}
        {comment.userId === user.id && (
          <button className="edit-comment-button" onClick={handleEditClick}>
            edit
          </button>
        )}
      </div>
      {isEditing ? (
        <CommentForm
          postId={comment.postId}
          comment={comment}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="comment-body">{comment.content}</div>
      )}
    </div>
  );
};

export default Comment;
