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


router.put('/:id(\\d+)', requireAuth, async (req, res) => {
    const postId = req.params.id;
    const { /* keys to update */ } = req.body;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.update({
            /* keys to update */
        });
        return res.json(post.toJSON());
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:postId(\\d+)', requireAuth, async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.sendStatus(404);
    await post.destroy();
    res.sendStatus(204);
});


module.exports = router;
