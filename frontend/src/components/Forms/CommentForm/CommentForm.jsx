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
import { thunkAddComment } from "../../../store/comments";
// CONTEXTS
// STYLES
import "./CommentForm.css";
//=======================================================================

const CommentForm = ({ postId }) => {
  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //       STATE VARIABLE ASSIGNMENTS
  //==========================================
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts?.palPosts[postId]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  const handleNewCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comment) return;
    const newComment = {
      userId: user?.id,
      authorId: post?.authorId,
      postId,
      parentCommentId: null,
      content: comment,
    };
    setComment("");
    dispatch(thunkAddComment(newComment));
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
    <form onSubmit={handleSubmit}>
      <FormTextArea
        label="Add Comment:"
        value={comment}
        onChange={handleNewCommentChange}
        onKeyDown={handleKeyDown}
      />
      <button className="submit-comment-button" type="submits">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
