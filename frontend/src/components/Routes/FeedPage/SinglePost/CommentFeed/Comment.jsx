import React from 'react';


const Comment = ({comment}) => {
    return (
        <div className="comment-container">{comment.text}</div>
    )

}

export default Comment;
