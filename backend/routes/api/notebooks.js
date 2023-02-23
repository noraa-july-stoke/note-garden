const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    let Notebooks = [];
    const userId = req.user.id;

    let notebookList = await Notebook.findAll({
        where: { authorId: userId }
    });
})

module.exports = router;
