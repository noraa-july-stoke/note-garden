const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, TextNote, ImageNotebook } = require("../../db/models");

const router = express.Router();

//Gets all the user's imagenotebooks and notebooks
router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const notebooks = await user.getNotebooks();
  res.status(200).json(notebooks);
});

//gets all notes related to a notebook by notebookId
router.get("/text-notebooks/:notebookId(\\d+)", async (req, res) => {
  const id = req.params.notebookId;
  const notes = await TextNote.getNotesByNotebookId(id);
  res.status(200).json(notes);
});

//creates a text notebook
router.post("/text-notebook", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;
  const newNotebook = await Notebook.create({
    authorId: userId,
    name,
  });
  res.status(201).json(newNotebook);
});

router.post("/image-notebook", requireAuth, async (req, res) => {
  // const userId = req.user.id;
  // const { name } = req.body;
  // const newNotebook = await ImageNotebook.create({
  //     authorId: userId,
  //     name,
  // });
  // res.status(201).json(newNotebook)
  return null;
});

router.put("/text-notebook/:id(\\d+)", requireAuth, async (req, res) => {
  const notebookId = req.params.id;
  const { name } = req.body;
  const notebook = await Notebook.findByPk(notebookId);
  await notebook.update({ name });
  res.status(200).json(notebook);
});

router.put("/image-notebook/:id(\\d+)", requireAuth, async (req, res) => {
  const imageNotebookId = req.params.id;
  const { name, description } = req.body;
  try {
    const imageNotebook = await ImageNotebook.findByPk(imageNotebookId);
    if (!imageNotebook) {
      return res.status(404).json({ message: "Image notebook not found" });
    }
    await imageNotebook.update({
      name,
      description,
    });
    res.json(imageNotebook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//This route moves all notes in a notebook into the user's default notebook and then deletes it.
router.delete("/text-notebook/:id(\\d+)", requireAuth, async (req, res) => {
  const notebookId = req.params.id;
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const rowsDeleted = await Notebook.safeNotesDelete(
    notebookId,
    user.defaultNotebookId
  );
  if (!rowsDeleted) res.status(404).json({ message: "notebook not found" });
  return res.status(200).json(rowsDeleted);
});
module.exports = router;
