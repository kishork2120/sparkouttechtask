// Modules requried for this page is imported here
const router = require('express').Router();
const notesController = require('./notes');

// Note routers
router.post('/addNotes', notesController.addNotes);
router.get('/getNotesList', notesController.getNotesList);
router.put('/editNotes', notesController.editNotes);
router.delete('/deleteNotes', notesController.deleteNotes);

// router should be exported in order for the master router to recognize it
module.exports = router;
