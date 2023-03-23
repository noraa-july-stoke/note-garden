import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import './CommentForm.css'

const CommentForm = ({ onComment }) => {
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
    onComment(newCommentObj);
    setNewComment("");
  };

  const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(event);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Comment:
        <textarea
          type="text-area"
          value={newComment}
          onChange={handleNewCommentChange}
          onKeyDown={handleKeyDown}
        />
      </label>
      <button className="submit-comment-button" type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
