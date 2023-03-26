//=============================================================
//   _____  _                _        ______            _
//  /  ___|(_)              | |       | ___ \          | |
//  \ `--.  _  _ __    __ _ | |  ___  | |_/ /___   ___ | |_
//   `--. \| || '_ \  / _` || | / _ \ |  __// _ \ / __|| __|
//  /\__/ /| || | | || (_| || ||  __/ | |  | (_) |\__ \| |_
//  \____/ |_||_| |_| \__, ||_| \___| \_|   \___/ |___/ \__|
//                     __/ |
//                    |___/
//=============================================================
// TAKES IN A POST OBJECT THAT CAN CONTAIN VARIOUS FORMS OF
// MEDIA AND THE INFO OF THE USER THAT MADE THE POST
//============================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import CommentFeed from "./CommentFeed/CommentFeed";
import MiniProfile from "../MiniProfile";
import Reactions from "../Reactions/Reactions";
// STYLESHEET
import "./SinglePost.css";

//============================================================
const SinglePost = ({ post }) => {
  console.log(post);

  //==========================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //    STATE VARIABLE ASSIGNMENTS
  //==========================================
  // const { authorInfo } = post.UserDatum;
  //===========================
  //          HOOKS
  //===========================

  //===========================
  // HELPERS/EVENT LISTENERS
  //===========================

  //===========================
  //         JSX BODY
  //===========================

  return (
    <div className="post-container">
      <MiniProfile user={post.UserDatum} postDate={post.createdAt} postMode={true} />
      {/* <div className="post-body-container">
        {post.content.url && (
          <img
            className="post-image"
            src={post.content.url}
            alt="post content"
          />
        )}
        {post.content.note && (
          <div
            className="post-text"
            dangerouslySetInnerHTML={{ __html: post.content.note }}></div>
        )}
      </div> */}
      {/* <CommentForm onAddComment={handleAddComment} /> */}
      <Reactions />
      <CommentFeed post={post} />
    </div>
  );
};

export default SinglePost;

// const SinglePost = ({ post }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const handleNewCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newCommentObj = {
//       id: uuidv4(),
//       text: newComment,
//     };
//     setComments([...comments, newCommentObj]);
//     setNewComment("");
//   };

//   return (
//     <div className="post-container">
//       <div className="post-body-container">
//         {post?.url && <img src={post.url} alt="post content" />}
//         <div
//           className="post-text"
//           dangerouslySetInnerHTML={{ __html: post?.note }}></div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Add Comment:
//           <input
//             type="text"
//             value={newComment}
//             onChange={handleNewCommentChange}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       <ul>
//         {comments?.map((comment) => (
//           <li key={comment.id}>
//             <div>{comment.text}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SinglePost;

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
