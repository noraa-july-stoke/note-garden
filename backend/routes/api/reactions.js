const express = require('express');
const { Reaction } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all reactions
router.get('/', requireAuth, async (req, res) => {
  try {
    const reactions = await Reaction.findAll();
    res.json({ reactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific reaction by ID
router.get('/:id(\\d+)', requireAuth, async (req, res) => {
  try {
    const reaction = await Reaction.findByPk(req.params.id);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json({ reaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new reaction
router.post('/', requireAuth, async (req, res) => {
  try {
    const reaction = await Reaction.create(req.body);
    res.json({ reaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an existing reaction by ID
router.put('/:id(\\d+)', requireAuth, async (req, res) => {
  try {
    const reaction = await Reaction.findByPk(req.params.id);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    await reaction.update(req.body);
    res.json({ reaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an existing reaction by ID
router.delete('/:id(\\d+)', requireAuth, async (req, res) => {
  try {
    const reaction = await Reaction.findByPk(req.params.id);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    await reaction.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
