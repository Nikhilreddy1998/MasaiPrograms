const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { testRoute, addNewNote, getNote, updateNote, deleteNote } = require("../controllers/note.controller");

const noteRouter = express.Router();

noteRouter.get("/protected", authMiddleware,testRoute);

// Add note
noteRouter.post("/", authMiddleware, addNewNote);

// Get note
noteRouter.get("/", authMiddleware,getNote);

// Update note
noteRouter.put("/:id", authMiddleware,updateNote);

// Delete note
noteRouter.delete("/:id",authMiddleware,deleteNote);


module.exports = noteRouter;
