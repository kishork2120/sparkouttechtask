/**
 * @function exceptionHandler
 * @description this will handle all the exception caused due to server failure
 * @param {Object} exception - exception object
 * @param {Object} res - response object from express
 * @param {Number} statusCode - corresponding status code for the response
 */
exports.exceptionHandler = (exception, res, statusCode = 500) => {
  console.log(exception);
  // To end the response
  if (res) {
    res.json({
      status: statusCode,
      errorMessage: exception,
    });
  };
};

/**
 * @function validationErrorHandler
 * @description this will handle all the exception caused by user validation
 * @param {Object} errors - errors from validation
 * @param {Object} res - response object from express
 * ! errors should be in the follwing format to be parsed by this function | format:{message:<validation message>}
 */
exports.validationErrorHandler = (errors, res) => {
  const errorMessage = Object.values(errors).map((e) => e.message).join(', ');
  res.json({
    status: 400,
    errorMessage,
  });
};
