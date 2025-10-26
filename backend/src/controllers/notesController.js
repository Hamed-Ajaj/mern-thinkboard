import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getNotes");
    res.status(500).json({ message: "Unexpected Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    console.error("Error in createNote controller");
    res.status(500).json({ message: "Unexpected Error" });
  }
};

export const updateNote = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `note ${id} updated successfully` });
};

export const deleteNote = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `note ${id} deleted successfully` });
};
