import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkLoadPalPosts } from "../../../../store/posts";

import SinglePost from "../SinglePost/SinglePost";
import "./PostFeed.css";
const PostFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.palPosts);
  const postList = Object.values(posts);

  useEffect(() => {
    dispatch(thunkLoadPalPosts());
  }, [dispatch]);

  console.log(posts);

  return (
    <div className="feed-container">
      {postList.map((post) => {
        return <SinglePost key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostFeed;
