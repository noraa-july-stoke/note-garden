import React, { useState } from "react";
import CommentForm from "../../../../Forms/CommentForm/CommentForm";

const CommentFeed = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newCommentObj) => {
    setComments([...comments, newCommentObj]);
  };

  return (
    <div className="comments-container">
      <CommentForm />
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
