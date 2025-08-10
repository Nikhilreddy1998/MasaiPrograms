const NoteModel = require("../models/note.model");

// Test route
const testRoute =  (req, res) => {
  try {
    res.status(200).json({ message: "Testing successful", user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Add note
const addNewNote =  async (req, res) => {
  try {
    req.body.createdBy = req.user;
    let note = await NoteModel.create(req.body);
    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Get note
const getNote = async (req, res) => {
  try {
    let notes = await NoteModel.find(
      { createdBy: req.user },
      { _id: 0, title: 1, content: 1 }
    );
    if (notes.length == 0) {
      return res.status(400).json({ message: "Note list is Empty!!" });
    }
    res.status(200).json({ message: "List of Notes", notes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Update note
const updateNote =  async (req, res) => {
  try {
    const { id } = req.params;
    let note = await NoteModel.findById(id);
    if(!note){
       return res.status(404).json({ message: "Note not Found!!" });
    }
    if (req.user == note.createdBy.toString()) {
        let note = await NoteModel.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json({ message: "Updated succesfully",note });
    } else {
        res.status(403).json({ message: "Unauthorized access to edit this note" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}

// Delete note
const deleteNote =  async (req, res) => {
  try {
    const {id} = req.params
    let note = await NoteModel.findById(id)
     if(!note){
       return res.status(400).json({ message: "Note not Found!!" });
    }
    if(note.createdBy.toString()==req.user){
        let deletedNote = await NoteModel.findByIdAndDelete(id)
        res.status(200).json({error:"Note get deleted",result:deletedNote})
    }else{
        res.status(403).json({error:"Unauthorized access to delete this note"})
    }
    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
}


module.exports = {
    testRoute,
    addNewNote,
    getNote,
    updateNote,
    deleteNote
}