import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadPalPosts } from "../../../store/posts";
import SinglePost from "../SinglePostPage/SinglePost";


const PostFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.palPosts);
  console.log(posts)

  useEffect(() => {
    dispatch(thunkLoadPalPosts());
  }, [dispatch]);

  return <>{Object.values(posts).map(post => {
    return <SinglePost post={post} />
  })}</>;
};

export default PostFeed;
