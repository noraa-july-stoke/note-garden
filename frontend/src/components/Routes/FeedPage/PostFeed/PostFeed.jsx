//=============================================================
//  ______            _    ______               _
//  | ___ \          | |   |  ___|             | |
//  | |_/ /___   ___ | |_  | |_  ___   ___   __| |
//  |  __// _ \ / __|| __| |  _|/ _ \ / _ \ / _` |
//  | |  | (_) |\__ \| |_  | | |  __/|  __/| (_| |
//  \_|   \___/ |___/ \__| \_|  \___| \___| \__,_|
//=============================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
import NewPost from "../../../NewPost";
import SinglePost from "../SinglePost/SinglePost";
// Thunks
import { thunkLoadPalPosts } from "../../../../store/posts";
import { thunkLoadPostComments } from "../../../../store/comments";
// STYLES
import "./PostFeed.css";
//=======================================================================
const PostFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.palPosts);
  const postList = Object.values(posts);
  const postIds = Object.keys(posts);

  useEffect(() => {
    dispatch(thunkLoadPalPosts());
  }, [dispatch]);

  useEffect(() => {
    if (postIds?.length) {
      dispatch(thunkLoadPostComments(postIds));
    }
  }, [dispatch, postIds]);

  return (
    <div className="feed-container">
      <NewPost />
      {postList.map((post) => {
        return <SinglePost key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostFeed;
