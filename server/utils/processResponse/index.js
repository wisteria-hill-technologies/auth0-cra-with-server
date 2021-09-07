const catchError = require('./catchError');

module.exports = async (response, customError) => {
  const error = catchError(response, customError);
  if (error) {
    return { error, data: null };
  }
  return { data: await response.json(), error: null };
};
