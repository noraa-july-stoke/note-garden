const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Pal } = require('../../db/models');

const router = express.Router();


// Querying across tables in my user model using these methods I wrote;
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId)
    const palIds = await user.getPals();
    const pals = await user.getPalsByIds(palIds)
    res.json(pals)
});

router.post('/', requireAuth, async (req, res) => {
    const { palId } = req.body;
    const userId = req.user.id;
    const pal = await Pal.create({ userId, palId });
    res.json({ pal });
});

router.delete('/:palId(\\d+)', requireAuth, async (req, res) => {
    const { id } = req.params;
    const pal = await Pal.findByPk(id);
    if (!pal) return res.sendStatus(404);
    await pal.destroy();
    res.sendStatus(204);
});

module.exports = router;
