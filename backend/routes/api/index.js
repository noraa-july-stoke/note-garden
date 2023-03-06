const router = require('express').Router();
const { validationResult } = require('express-validator');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebooksRouter = require('./notebooks.js');
const notesRouter = require('./notes');
const palsRouter = require('./pals');
const collaborationsRouter = require('./collaborations');
const postsRouter = require('./posts');
const reactionsRouter = require('./reactions');
const commentsRouter = require('./comments')

const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebooksRouter);
router.use('/notes', notesRouter);
router.use('/pals', palsRouter);
router.use('/collaborations', collaborationsRouter);
router.use('/posts', postsRouter);
router.use('/reactions', reactionsRouter);
router.use('/comments', commentsRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});



module.exports = router;
