import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import FormTextArea from "../Inputs/FormTextArea";
import "./CommentForm.css";

const CommentForm = ({ postId }) => {
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts?.palPosts[postId]);
  const postComments = useSelector((state) => state.comments?.postComments[postId]);
  const [newComment, setNewComment] = useState("");
  // console.log(post)

  // const handleNewCommentChange = (event) => {
  //   setNewComment(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newComment) return;
    const newCommentObj = {
      userId: user?.id,
      authorId: post?.authorId,
      parentCommentId: null,
      content: newComment,
    };
    console.log(newCommentObj);
    // onComment(newCommentObj);
    setNewComment("");
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     handleSubmit(event);
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    //   <FormTextArea
    //     label="Add Comment:"
    //     value={newComment}
    //     onChange={handleNewCommentChange}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <button className="submit-comment-button" type="submit">
    //     Submit
    //   </button>
    // </form>
    <form>
      <FormTextArea
        label="Add Comment:"
        // value={newComment}
        // onChange={handleNewCommentChange}
        // onKeyDown={handleKeyDown}
      />
      <button className="submit-comment-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
