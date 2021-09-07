module.exports = (req, res, next) => {
  const incompleteTokenData = !req.session.csrfToken || !req.headers['x-csrf-token'];
  const tokenMismatch = req.session.csrfToken !== req.headers['x-csrf-token'];
  console.log('checkCsrf!!!!!!');
  console.log('req.session.csrfToken >>>>', req.session.csrfToken);
  console.log('req.session.user >>>>>', req.session.user);

  if (
    process.env.CSRF_CHECK !== 'false' &&
    (incompleteTokenData || tokenMismatch)) {
    console.log('csrf check failed!')
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
  } else {
    console.log('check csrf passed!!');
    next();
  }
};
