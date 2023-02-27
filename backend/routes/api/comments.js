const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');

const router = express.Router();

// Get all comments
router.get('/', requireAuth, async (req, res) => {
        const comments = await Comment.findAll();
        res.json(comments);
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
});

// Get a single comment by ID
router.get('/:id(\\d+)', requireAuth, async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
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

        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
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
