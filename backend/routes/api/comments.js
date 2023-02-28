const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Comment, User } = require('../../db/models');

const router = express.Router();

//--------------------------------------------
// GET ROUTES
//--------------------------------------------
// Get all user's comments left on other user's posts
router.get('/', requireAuth, async (req, res) => {
        const userId = req.user.id;
        const user = await User.findByPk(userId)
        const comments = await user.getComments(userId)
        res.status(200).json(comments);
});



// Get a single comment by ID
router.get('/:id(\\d+)', requireAuth, async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new comment
router.post('/', requireAuth, async (req, res) => {
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
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update an existing comment
router.put('/:id(\\d+)', requireAuth, async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.update({
            content,
        });
        return res.json(comment.toJSON());
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a comment
router.delete('/:id(\\d+)', requireAuth, async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.destroy();
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
