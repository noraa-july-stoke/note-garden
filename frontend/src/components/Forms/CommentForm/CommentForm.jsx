//======================================================================
//   _____                                      _
//  /  __ \                                    | |
//  | /  \/ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ______
//  | |    / _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __|______|
//  | \__/\ (_) | | | | | | | | | | |  __/ | | | |_
//   \____/\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|
//   |  ___|
//   | |_ ___  _ __ _ __ ___
//   |  _/ _ \| '__| '_ ` _ \
//   | || (_) | |  | | | | | |
//   \_| \___/|_|  |_| |_| |_|
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import FormTextArea from "../Inputs/FormTextArea";
// HELPERS
// THUNKS
import { thunkAddComment, thunkEditComment } from "../../../store/comments";
// CONTEXTS
// STYLES
import "./CommentForm.css";
//=======================================================================

const CommentForm = ({ postId, comment, setIsEditing }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts?.palPosts[postId]);
  const [newComment, setNewComment] = useState(comment?.content || "");

  const dispatch = useDispatch();
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      const editedComment = {
        ...comment, content: newComment
      };
      dispatch(thunkEditComment(editedComment));
      setIsEditing(false);
      setNewComment("");
    } else {
      const newCommentObj = {
        userId: user?.id,
        authorId: post?.authorId,
        postId,
        parentCommentId: null,
        content: newComment,
      };
      console.log("thunk comment disaptch", newCommentObj)
      dispatch(thunkAddComment(newCommentObj));
    }
    setNewComment("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  //====================================
  //            JSX BODY
  //====================================

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <FormTextArea
        label="Add Comment:"
        value={newComment}
        onChange={handleNewCommentChange}
        onKeyDown={handleKeyDown}
      />
      <button className="submit-comment-button" type="submit">
        Submit
      </button>
      {comment && <button
        className="cancel-comment-button"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(false);
        }}>
        cancel
      </button>}
    </form>
  );
};

export default CommentForm;
