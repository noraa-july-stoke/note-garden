const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const notebooks = user.getNotebooks();
    res.status(200).json(notebooks);
});

router.post('/', requireAuth, async (req, res) => {

    return "notebook post route working"
});

router.put('/noteBookId(\\d+)', requireAuth, async (req, res) => {
    return "notebook put route working"
});

router.delete('/notebookId(\\d+)', requireAuth, async (req, res) => {
    return "notebook delete route working"

});

module.exports = router;
