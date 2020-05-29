// Modules requried for this page is imported here
const router = require('express').Router();
const user = require('./user');

// Routers for user module
// TODO Should include CRUD for user management
router.post('/login', user.login);
router.post('/register', user.register);

// router should be exported in order for the master router to recognize it
module.exports = router;
