// Modules requried for this page is imported here
const user = require('../controllers/users');
const notes = require('../controllers/notes');

// Master router config
module.exports = (app) => {
  app.use('/user', user);
  app.use('/notes', notes);
};
