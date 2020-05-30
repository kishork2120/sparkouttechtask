// Modules requried for this page is imported here
// ! This module is a rouch implementation of notes, will change with respect to feedback
const notesModle = require('../../models/notes.model');
const helper = require('../../common/helper');

/**
 * @function addNotes
 * @description - add notes
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.addNotes = async (req, res) => {
  try {
    const body = req.body;
    const notesDetails = await notesModle.addNotes(body);
    res.json({
      status: 200,
      message: 'Notes added',
      notesDetails,
    });
  } catch (e) {
    if (e.name === 'ValidationError') helper.validationErrorHandler(e.errors, res);
    else helper.exception_handler(e, res);
  }
};

/**
 * @function getNotesList
 * @description - get all notes
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.getNotesList = async (req, res) => {
  try {
    const query = req.query;
    console.log(req.session.passport.user);
    const notesList = await notesModle.getNotesList(query);
    res.json({
      status: 200,
      message: 'Notes list',
      notesList,
    });
  } catch (e) {
    helper.exception_handler(e, res);
  }
};

/**
 * @function editNotes
 * @description - update note data based on id
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.editNotes = async (req, res) => {
  try {
    const body = req.body;
    const notesDetails = await notesModle.updateNotes(body);
    res.json({
      status: 200,
      message: 'Notes details updated',
      notesDetails,
    });
  } catch (e) {
    if (e.name === 'ValidationError') helper.validationErrorHandler(e.errors, res);
    else helper.exception_handler(e, res);
  }
};

/**
 * @function deleteNotes
 * @description - delete notes based on note id
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.deleteNotes = async (req, res) => {
  try {
    const body = req.body;
    const notesDetails = await notesModle.deleteNotes(body);
    res.json({
      status: 200,
      message: 'Notes deleted',
      notesDetails,
    });
  } catch (e) {
    if (e.name === 'ValidationError') helper.validationErrorHandler(e.errors, res);
    else helper.exception_handler(e, res);
  }
};
