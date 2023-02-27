const { Storage } = require('@google-cloud/storage');
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook, ImageNote, TextNote } = require('../../db/models');

const router = express.Router();
const uploadImage = require('../../utils/upload-helpers')


//--------------------------------------------
// GET ROUTES
//--------------------------------------------

//GET ALL THE USER'S NOTES
router.get('/all-notes', async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId)
    const notes = await user.getNotes()
    console.log(notes)
    res.status(200).json(notes)
});

//GETS A TEXTNOTE BY IT'S ID
router.get('/text-notes/:noteId(\\d+)', async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const textNote = await TextNote.findOne({
            where: {
                id: noteId
            }
        });
        const resNote = textNote.toJSON();
        console.log(resNote)
        res.json(resNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GETS AN IMAGENOTE BY IT'S ID
router.get('/image-notes/:noteId(\\d+)', async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const imageNote = await ImageNote.findOne({
            where: {
                id: noteId
            }
        });

        if (!imageNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const resNote = imageNote.toJSON();
        res.json(resNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//--------------------------------------------
// POST ROUTES
//--------------------------------------------


router.post('/image-note', async (req, res, next) => {
    let imageUrl;
    try {
        const newFile = req.file
        imageUrl = await uploadImage(newFile)
    } catch (error) {
        next(error)
    }
    const newImageNote = ImageNote.build({
        authorId: req.user.id,
        name: req.body.name,
        url: imageUrl
    })

    console.log(newImageNote)
    const responseNote = await newImageNote.save()

    res
        .status(201)
        .json(responseNote)

});

router.post('/text-note', async (req, res, next) => {
    let { name, note, notebookId } = req.body.note;
    notebookId ? null: notebookId = null;
    const userId = req.user.id;

    const newTextNote = await TextNote.create({
        authorId: userId,
        notebookId,
        name,
        note,
    });
    const responseNote = await newTextNote.save()
    console.log(responseNote)
    res.json(responseNote);

})

module.exports = router;
