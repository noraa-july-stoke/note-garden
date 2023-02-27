const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Collaboration } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId)
    console.log(user)
    const collaborations = await user.getCollaborations();
    console.log(collaborations)
    res.status(200).json(collaborations)
});

router.post('/', requireAuth, async (req, res) => {
    const { collaboratorId } = req.body;
    const userId = req.user.id;
    const collaboration = await Collaboration.create({ userId, collaboratorId });
    res.json({ collaboration });
});

router.delete('/:id(\\d+)', requireAuth, async (req, res) => {
    const { id } = req.params;
    const collaboration = await Collaboration.findByPk(id);
    if (!collaboration) return res.sendStatus(404);
    await collaboration.destroy();
    res.sendStatus(204);
});

module.exports = router;
