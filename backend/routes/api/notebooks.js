const express = require('express')
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


router.put('/:id(\\d+)', requireAuth, async (req, res) => {
    const notebookId = req.params.id;
    const { name, description } = req.body;

    try {
        const notebook = await Notebook.findByPk(notebookId);
        if (!notebook) {
            return res.status(404).json({ message: 'Notebook not found' });
        }
        await notebook.update({
            name,
            description,
        });
        res.json(notebook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.put('/image-notebook/:id(\\d+)', requireAuth, async (req, res) => {
    const imageNotebookId = req.params.id;
    const { name, description } = req.body;
    try {
        const imageNotebook = await ImageNotebook.findByPk(imageNotebookId);
        if (!imageNotebook) {
            return res.status(404).json({ message: 'Image notebook not found' });
        }
        await imageNotebook.update({
            name,
            description,
        });
        res.json(imageNotebook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.delete('/notebookId(\\d+)', requireAuth, async (req, res) => {
    return "notebook delete route working"

});

module.exports = router;
