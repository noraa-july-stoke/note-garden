import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";

const SinglePost = ({ post }) => {

  const [comments, setComments] = useState([]);
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
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.note }}></div>
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
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <div>{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SinglePost;

// import React, { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';

// function CommentBox() {
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState("");
//     const [replyText, setReplyText] = useState("");
//     const [replyTo, setReplyTo] = useState(-1);

//     const handleCommentSubmit = (e) => {
//         e.preventDefault();
//         if (commentText.trim() === "") return;

//         const newComment = {
//             id: uuidv4(),
//             author: "User",
//             text: commentText,
//             replies: [],
//         };

//         setComments([...comments, newComment]);
//         setCommentText("");
//     };

//     const handleReplySubmit = (e, commentId) => {
//         e.preventDefault();
//         if (replyText.trim() === "") return;

//         const newReply = {
//             id: uuidv4(),
//             author: "User",
//             text: replyText,
//         };

//         const updatedComments = comments.map((comment) => {
//             if (comment.id === commentId) {
//                 return {
//                     ...comment,
//                     replies: [...comment.replies, newReply],
//                 };
//             } else {
//                 return comment;
//             }
//         });

//         setComments(updatedComments);
//         setReplyText("");
//         setReplyTo(-1);
//     };

//     return (
//         <div>
//             <h2>Comments</h2>
//             <form onSubmit={handleCommentSubmit}>
//                 <input
//                     type="text"
//                     value={commentText}
//                     placeholder="Leave a comment..."
//                     onChange={(e) => setCommentText(e.target.value)}
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             {comments.map((comment) => (
//                 <div key={comment.id}>
//                     <p>
//                         {comment.author}: {comment.text}
//                     </p>
//                     <button onClick={() => setReplyTo(comment.id)}>Reply</button>
//                     {replyTo === comment.id && (
//                         <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
//                             <input
//                                 type="text"
//                                 value={replyText}
//                                 placeholder="Reply to this comment..."
//                                 onChange={(e) => setReplyText(e.target.value)}
//                             />
//                             <button type="submit">Submit</button>
//                         </form>
//                     )}
//                     {comment.replies.map((reply) => (
//                         <div key={reply.id}>
//                             <p>
//                                 {reply.author}: {reply.text}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default CommentBox;
