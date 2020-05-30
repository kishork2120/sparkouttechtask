// Modules requried for this page is imported here
const userModel = require('../../models/user.model');
const helper = require('../../common/helper');
const passport = require('passport');
const btoa = require('btoa');

/**
 * @function login
 * @description user login
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 * @param {Object} next - next object from express
 */
exports.login = (req, res, next) => {
  // Using passport for session
  passport.authenticate('local', (err, user, info) => {
    try {
      if (err) throw err;
      if (user) {
        req.logIn(user, (err) => {
          console.log(req.session);
          if (err) {
            return next(err);
          }
          return res.json({ status: 200, session_data: btoa(`${user.id}_${user.email}`), message: 'Login success' });
        });
      } else {
        throw Object({ name: 'ValidationError', errors: { update_error: { message: info } } });
      }
    } catch (e) {
      if (e.name === 'ValidationError') helper.validationErrorHandler(e.errors, res);
      else helper.exceptionHandler(e, res);
    }
  })(req, res, next);
};

/**
 * @function register
 * @description - registers the user
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.register = async (req, res) => {
  try {
    const body = req.body;
    const userDetails = await userModel.register(body);
    res.json({
      status: 200,
      message: 'User registered',
      userDetails,
    });
  } catch (e) {
    if (e.name === 'ValidationError') helper.validationErrorHandler(e.errors, res);
    else helper.exceptionHandler(e, res);
  }
};

/**
 * @function logout
 * @description - logout the user
 * @param {Object} req - request object from express
 * @param {Object} res - response object from express
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ status: 200, message: 'You have been logged out.' });
};
