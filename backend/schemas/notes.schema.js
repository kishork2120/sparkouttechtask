const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notes schema
const NotesSchema = new Schema({
  name: {
    type: String,
    min: [3, 'Minimum 3 characters required'],
    max: [30, 'Maximum 30 characters allowed'],
    required: [true, 'Note Name requied'],
  },
  content: {
    type: String,
    min: [1, 'Content cannot be empty'],
    max: [30, 'Maximum 30 characters allowed'],
    required: [true, 'Note content cannot be empty'],
  },
  createdBy: { type: mongoose.ObjectId, required: [true, 'Created ID required'] },
  deleted: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date },
});

// Exporting user model
module.exports = mongoose.model('Notes', NotesSchema);
