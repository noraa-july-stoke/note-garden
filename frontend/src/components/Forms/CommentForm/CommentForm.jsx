import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";


const CommentForm = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentObj = {
      id: uuidv4(),
      text: newComment,
    };
    onAddComment(newCommentObj);
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Comment:
        <input
          type="text"
          value={newComment}
          onChange={handleNewCommentChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
export default CommentForm;
