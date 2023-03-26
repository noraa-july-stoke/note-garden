//==================================================================================
//  88888888ba
//  88      "8b                           ,d
//  88      ,8P                           88
//  88aaaaaa8P'  ,adPPYba,   ,adPPYba,  MM88MMM  ,adPPYba,
//  88""""""'   a8"     "8a  I8[    ""    88     I8[    ""
//  88          8b       d8   `"Y8ba,     88      `"Y8ba,
//  88          "8a,   ,a8"  aa    ]8I    88,    aa    ]8I
//  88           `"YbbdP"'   `"YbbdP"'    "Y888  `"YbbdP"'
//==================================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
const express = require("express");

//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
const { requireAuth } = require("../../utils/auth");
const { User, UserData, Post } = require("../../db/models");

//=======================================================================
const router = express.Router();
//=======================================================================
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
//=======================================================================

//=======================================================================
//Gets all the user's posts
//=======================================================================

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const posts = await user.getPosts();
  res.status(200).json(posts);
});

//========================================
// Gets all the user & user's pals posts,
// gives user a feed to interact with.
//========================================
router.get("/all-posts", requireAuth, async (req, res) => {
  //get pal relationships with userId
  const userId = req.user.id;
  // !@#$ needs changed to Pals.getUserPals........
  const user = await UserData.findByPk(userId);
  const pals = await user.getPals();
  pals.userId = userId;
  // console.log(pals);
  const palPosts = await Post.findAllByAuthors(pals);
  res.status(200).json(palPosts);
});

//=======================================================================
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
//=======================================================================

router.post("/", requireAuth, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const post = await Post.create({ content, authorId: userId });
  res.json({ post });
});


//=======================================================================
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
//=======================================================================

router.put("/:id(\\d+)", requireAuth, async (req, res) => {
  const postId = req.params.id;
  const {
    /* keys to update */
  } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.update({
      /* keys to update */
    });
    return res.json(post.toJSON());
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

router.delete("/:postId(\\d+)", requireAuth, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return res.sendStatus(404);
  await post.destroy();
  res.sendStatus(204);
});

module.exports = router;
