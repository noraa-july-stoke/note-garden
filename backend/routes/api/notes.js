//=============================================================
//                             ,d
//                             88
//  8b,dPPYba,    ,adPPYba,  MM88MMM  ,adPPYba,  ,adPPYba,
//  88P'   `"8a  a8"     "8a   88    a8P_____88  I8[    ""
//  88       88  8b       d8   88    8PP"""""""   `"Y8ba,
//  88       88  "8a,   ,a8"   88,   "8b,   ,aa  aa    ]8I
//  88       88   `"YbbdP"'    "Y888  `"Ybbd8"'  `"YbbdP"'
//=============================================================

const { Storage } = require("@google-cloud/storage");
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Photo, TextNote } = require("../../db/models");

const router = express.Router();
const uploadImage = require("../../utils/upload-helpers");

//=================================================
//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀
//  ▐░▌          ▐░▌               ▐░▌
//  ▐░▌ ▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//  ▐░▌ ▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌
//  ▐░▌       ▐░▌▐░▌               ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀
//==================================================

//========================================
//GET ALL THE USER'S NOTES
//========================================

router.get("/", async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const notes = await user.getNotes();
  res.status(200).json(notes);
});


//====================================================================
//GETS A TEXTNOTE BY IT'S ID
//====================================================================
router.get("/text-note/:noteId(\\d+)", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const textNote = await TextNote.findByPk(noteId);
    const resNote = textNote.toJSON();
    console.log(resNote);
    res.status(200).json(resNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//====================================================================
//GETS AN IMAGENOTE BY IT'S ID
//====================================================================
router.get("/image-note/:noteId(\\d+)", async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const imageNote = await ImageNote.findOne({
      where: {
        id: noteId,
      },
    });

    if (!imageNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const resNote = imageNote.toJSON();
    res.json(resNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//============================================================
//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌               ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌
//  ▐░▌          ▐░▌       ▐░▌          ▐░▌     ▐░▌
//  ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌
//  ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌
//   ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀
//=============================================================

//============================================================
//============================================================
router.post("/image-note", async (req, res, next) => {
  try {
    const newFiles = req.files.files;
    const imageUrls = await uploadImage(newFiles);
    console.log(imageUrls);

    const newPhotos = imageUrls.map((url) => {
      return Photo.build({
        authorId: req.user.id,
        name: req.body.name,
        isPublic: false,
        url,
        caption: "a photo"
      });
    });
    const responseNotes = await Promise.all(
      newPhotos.map((photo) => photo.save())
    );

    res.status(201).json(responseNotes);
  } catch (error) {
    next(error);
  }
});



//============================================================
//============================================================
router.post("/text-note", async (req, res, next) => {
  let { name, note, notebookId } = req.body.note;
  notebookId ? null : (notebookId = null);
  const userId = req.user.id;

  const newTextNote = await TextNote.create({
    authorId: userId,
    notebookId,
    name,
    note,
  });
  const responseNote = await newTextNote.save();
  console.log(responseNote);
  res.json(responseNote);
});


//=============================================================
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀
//  ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌     ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌     ▐░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌     ▐░▌
//  ▐░▌          ▐░▌       ▐░▌     ▐░▌
//  ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌
//  ▐░▌          ▐░░░░░░░░░░░▌     ▐░▌
//   ▀            ▀▀▀▀▀▀▀▀▀▀▀       ▀
//=============================================================


//============================================================
//   EDITS A TEXTNOTE BY ITS ID
//============================================================
router.put("/text-note/:id(\\d+)", requireAuth, async (req, res) => {
  const textNoteId = req.params.id;
  const { note } = req.body;
  const textNote = await TextNote.findByPk(textNoteId);
  console.log("NOTE IN ROUTE", note.note);
  await textNote.update({
    name: note.name,
    note: note.note,
    notebookId: note.notebookId,
  });
  res.json(note);
});

// router.put('/image-note/:id(\\d+)', requireAuth, async (req, res) => {
//     const noteId = req.params.id;
//     const { title, content } = req.body;

//     try {
//         const note = await ImageNote.findByPk(noteId);
//         if (!note) {
//             return res.status(404).json({ message: 'Note not found' });
//         }
//         await note.update({
//             title,
//             content,
//         });
//         res.json(note);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// });


//==================================================================================
//   ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀
//  ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌               ▐░▌     ▐░▌
//  ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌          ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//  ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀
//  ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌               ▐░▌     ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//   ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀
//==================================================================================

//============================================================
//============================================================


router.delete("/text-note/:id(\\d+)", requireAuth, async (req, res) => {
  const noteId = req.params.id;
  console.log();
  const rowsDeleted = await TextNote.deleteById(noteId);
  if (!rowsDeleted) res.status(404).json({ message: "note not found" });
  res.status(200).json(rowsDeleted);
});

module.exports = router;
