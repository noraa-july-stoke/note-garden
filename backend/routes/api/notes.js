const { Storage } = require('@google-cloud/storage');
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook, ImageNote, TextNote } = require('../../db/models');

const router = express.Router();
const uploadImage = require('../../utils/upload-helpers')


//GET ALL THE USER'S NOTES
router.get('/all-notes', async (req, res) => {
    const userId = req.user.id;
    let notes = {}
    let textNotes = {}
    let imageNotes = {}

    //Text Note Query
    const textNoteData = await TextNote.findAll({
        where: {
            authorId: userId
        }
    })

    for (let note of textNoteData) {
        note = note.toJSON()
        textNotes[note.id] = note
    }

    //Image Note Query
    const imageNoteData = await ImageNote.findAll({
        where: {
            authorId: userId
        }
    })

    for (let note of imageNoteData) {
        note = note.toJSON()
        imageNotes[note.id] = note
    }

    notes.textNotes = textNotes;
    notes.imageNotes = imageNotes;
    console.log(notes)

    res.status(200).json(notes)
});

router.post('/image-note', async (req, res, next) => {
    let imageUrl;
    try {
        const newFile = req.file
        imageUrl = await uploadImage(newFile)
    } catch (error) {
        next(error)
    }

    console.log("DATA FOR ROUTE:", req.user.id, req.body.name, imageUrl)
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
    const { note } = req.body;

    // const newNote = await TextNote.create({
    //     authorId,
    //     notebookId,
    //     name,
    //     note,
    // });
    res.json(note);

})

module.exports = router;
