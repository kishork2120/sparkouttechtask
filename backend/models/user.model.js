// Modules requried for this page is imported here
const UserModel = require('../schemas/user.schema');

/**
 * @function login
 * @description - login users
 * @param {Object} body - user data
 * @return {Object | Boolean} - returns user details / return false if there are not users found
 */
exports.login = async (body) => {
  // Find one user based on email
  const userDetails = await UserModel.findOne({ email: body.email });
  const isMatch = userDetails && await userDetails.comparePassword(body.password);
  return (isMatch) ? userDetails : false;
};

/**
 * @function findOneUser
 * @description - find a single user based on ID
 * @param {Object} body - user data ( Should contain ID )
 * @return {Promise} - resolves to user details
 */
exports.findOneUser = (body)=>{
  return UserModel.findOne({ _id: body._id });
};


/**
 * @function register
 * @description - register users
 * @param {Object} body - user data
 * @return {Promise} - return a promise resoved to inserted data
 */
exports.register = (body) => {
  const user = new UserModel(body);
  return user.save();
};
