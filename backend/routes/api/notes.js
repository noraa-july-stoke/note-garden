const { Storage } = require('@google-cloud/storage');
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook, ImageNote, TextNote } = require('../../db/models');

const router = express.Router();
const uploadImage = require('../../utils/upload-helpers')

router.get('/all-notes', async (req, res) => {
    const userId = req.user.id;
    let notes = {}
    let textNotes = {}
    let imageNotes = {}

    const textNoteData = await TextNote.findAll({
        where: {
            authorId: userId
        }
    })

    for (let note of textNoteData) {
        note = note.toJSON()
        textNotes[note.id] = note
    }

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
})

router.post('/image-note', async (req, res, next) => {
    let imageUrl
    try {
        const newFile = req.file
        imageUrl = await uploadImage(newFile)
    } catch (error) {
        next(error)
    }

    const newTextNote = TextNote.build({
        authorId: req.user.id,

    })

    res
        .status(200)
        .json({
            message: "Upload was successful",
            data: imageUrl
        })

    console.log(imageUrl)
    console.log(req.body.name)
})

router.post('/text-note', async (req, res, next) => {


})
module.exports = router;
