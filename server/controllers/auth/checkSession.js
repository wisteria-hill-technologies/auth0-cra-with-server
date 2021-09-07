module.exports = (req, res, next) => {
  if (process.env.AUTH_CHECK !== 'false' && !req.session.user) {
    console.log('session check failed!');
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
  } else {
    console.log('session check passed!')
    next();
  }
};
