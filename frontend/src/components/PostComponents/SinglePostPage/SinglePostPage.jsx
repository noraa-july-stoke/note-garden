import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPalPosts } from "../../../store/posts";

const SinglePostPage = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts?.palPosts);
    let post = {
        body: "<div>Hello!!!!</div>"
    }
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        dispatch(thunkLoadPalPosts());
    }, [dispatch]);

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
            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
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
}

export default SinglePostPage;
