const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const posts = User.getPosts;
    res.json({ posts });
});

router.post('/', requireAuth, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const post = await Post.create({ content, authorId: userId });
    res.json({ post });
});

router.delete('/:postId(\\d+)', requireAuth, async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.sendStatus(404);
    await post.destroy();
    res.sendStatus(204);
});


module.exports = router;
