module.exports = (err, req, res, next) => {
  // need to pass next above as param.
  if (err.status === 401 && req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(error.status || 500);
      }
    });
  }

  res.status(err.status || 500);
  throw res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
};
