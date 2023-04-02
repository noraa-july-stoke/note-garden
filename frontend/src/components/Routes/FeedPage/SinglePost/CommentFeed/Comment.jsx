import React from 'react';
import CommentFeed from './CommentFeed';


const Comment = ({comment, comments}) => {
    const parentCommentId = comment.id;
    const subComments = comments.filter(comment => comment.parentCommentId === parentCommentId);
    // console.log(subComments, parentCommentId);
    return (
      <div className="comment-container">
        {comment.content}
        <div className="sub-comments-container">
        {subComments.map(comment => {
            return <>{comment.content}</>
        })}
        </div>
      </div>
    );
}
export default Comment;
