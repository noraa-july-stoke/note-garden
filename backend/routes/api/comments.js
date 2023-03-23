//==============================================================================================================
//                                                                                             ,d
//                                                                                             88
//   ,adPPYba,   ,adPPYba,   88,dPYba,,adPYba,   88,dPYba,,adPYba,    ,adPPYba,  8b,dPPYba,  MM88MMM  ,adPPYba,
//  a8"     ""  a8"     "8a  88P'   "88"    "8a  88P'   "88"    "8a  a8P_____88  88P'   `"8a   88     I8[    ""
//  8b          8b       d8  88      88      88  88      88      88  8PP"""""""  88       88   88      `"Y8ba,
//  "8a,   ,aa  "8a,   ,a8"  88      88      88  88      88      88  "8b,   ,aa  88       88   88,    aa    ]8I
//   `"Ybbd8"'   `"YbbdP"'   88      88      88  88      88      88   `"Ybbd8"'  88       88   "Y888  `"YbbdP"'
//==============================================================================================================

const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Comment, User } = require("../../db/models");

const router = express.Router();

//==================================================================================
//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀
//  ▐░▌          ▐░▌               ▐░▌
//  ▐░▌ ▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//  ▐░▌ ▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌
//  ▐░▌       ▐░▌▐░▌               ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀
//==================================================================================

//==================================================================================
// Get a single comment by ID
//==================================================================================
router.get("/:id(\\d+)", requireAuth, async (req, res) => {
  // Get the ID of the comment from the request parameters
  const commentId = req.params.id;
  // Find the comment in the database based on the ID
  const comment = await Comment.findByPk(commentId);
  // If the comment is not found, send a 404 error response
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  // If the comment is found, send it as a JSON response with a 200 status code
  res.json(comment);
});

//==================================================================================
// Get all comments left by the authenticated user on other users' posts
//==================================================================================
router.get("/user-comments", requireAuth, async (req, res) => {
  // Get the ID of the authenticated user
  const userId = req.user.id;
  // Find the user record in the database based on the ID
  const user = await User.findByPk(userId);
  // Get all comments left by the user on other users' posts
  const comments = await user.getComments(userId);
  // Send the comments as a JSON response with a 200 status code
  res.status(200).json(comments);
});

//==================================================================================
// Get all comments associated with posts in the user's feed from database
//==================================================================================
router.get("/feed-comments", requireAuth, async (req, res) => {
  const comments = await Comment.getCommentsByPostIds(ids);
  res.status(200).json(comments);
});



//==================================================================================
//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌               ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌
//  ▐░▌          ▐░▌       ▐░▌          ▐░▌     ▐░▌
//  ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌
//  ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//   ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀
//==================================================================================

//==================================================================================
// Create a new comment
//==================================================================================

router.post("/", requireAuth, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await Comment.create({
      content,
      userId,
    });

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//==================================================================================
//   ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀
//  ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌     ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌     ▐░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌     ▐░▌
//  ▐░▌          ▐░▌       ▐░▌     ▐░▌
//  ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌
//  ▐░▌          ▐░░░░░░░░░░░▌     ▐░▌
//   ▀            ▀▀▀▀▀▀▀▀▀▀▀       ▀
//==================================================================================

//==================================================================================
// Update an existing comment
//==================================================================================

router.put("/:id(\\d+)", requireAuth, async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.update({
      content,
    });
    return res.json(comment.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//==================================================================================
//   ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀
//  ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌               ▐░▌     ▐░▌
//  ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌          ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//  ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀
//  ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌               ▐░▌     ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//   ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀
//==================================================================================

//==================================================================================
// Delete a comment
//==================================================================================

router.delete("/:id(\\d+)", requireAuth, async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
