module.exports = (response, { message = '', status = '' } = {}) => {
  if (!response.ok) {
    const error = new Error(message || response.statusText);
    error.status = status || response.status;
    return error;
  }
  return null;
};
