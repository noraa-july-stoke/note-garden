const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Collaboration } = require('../../db/models');

const router = express.Router();




//--------------------------------------------
// GET ROUTES
//--------------------------------------------
//Gets user's collaborations
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId)
    const collaborations = await user.getCollaborations();
    res.status(200).json(collaborations)
});

//--------------------------------------------
// POST ROUTES
//--------------------------------------------
//Makes new collaboration between user & another user.
router.post('/', requireAuth, async (req, res) => {
    const { collaboratorId, noteId } = req.body;
    const textNote = true;
    const userId = req.user.id;
    const collaboration = await Collaboration.create({ userId, collaboratorId, noteId, textNote });
    res.json({ collaboration });
});

//--------------------------------------------
// PUT ROUTES
//--------------------------------------------

router.put('/', requireAuth, async (req, res) => {
    return "collab put route"

});

//--------------------------------------------
// DELETE ROUTES
//--------------------------------------------

router.delete('/:id(\\d+)', requireAuth, async (req, res) => {
    const { id } = req.params;
    const collaboration = await Collaboration.findByPk(id);
    if (!collaboration) return res.sendStatus(404);
    await collaboration.destroy();
    res.status(204).json()
});

module.exports = router;
