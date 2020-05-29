// Modules requried for this page is imported here
const NotesModel = require('../schemas/notes.schema');

/**
 * @function addNotes
 * @description - adding notes to db
 * @param {Object} body - notes data from controller to be added
 * @return {Promise} - resolves to added notes data
 */
exports.addNotes = async (body) => {
  const notes = new NotesModel(body);
  return await notes.save();
};

/**
 * @function getNotesList
 * @description - getting list of notes
 * @param {Object} data - object containing id of the user
 * @return {Promise} - resolves to list of notes
 */
exports.getNotesList = async (data) => {
  const query = { deleted: false };
  return NotesModel.find(query);
};

/**
 * @function updateNotes
 * @description - update notes data based on id
 * @param {Object} data - notes data to be updated
 * @return {Promise} - resolves to updated notes data
 */
exports.updateNotes = async (data) => {
  data.updatedDate = new Date();
  const updateStatus = await NotesModel.findOneAndUpdate({ _id: data.id }, { $set: data }, { runValidators: true, context: 'query', new: true });
  if (updateStatus) return updateStatus;
  else throw Object({ name: 'ValidationError', errors: { update_error: { message: 'No records updated, provide a valid ID / No values changed' } } });
};

/**
 * @function deleteNotes
 * @description - deletes a note by changing the deleted status to true
 * @param {Object} data - note id to be deleted
 * @return {Promise} - resolves to deleted notes data
 */
exports.deleteNotes = async (data) => {
  data.deleted = true;
  // date will be updated automatically
  data.updatedDate = new Date();
  const deleteStatus = await NotesModel.findOneAndUpdate({ _id: data.id }, { $set: data });
  if (deleteStatus) return deleteStatus;
  else throw Object({ name: 'ValidationError', errors: { update_error: { message: 'No records deleted, provide a valid ID' } } });
};
