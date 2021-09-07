module.exports = (req, res, next) => {
  if(req.session.user) {
    const { name, email, picture } = req.session.user.metaData || {};
    res.json( { name, email, picture });
  } else {
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
  }
};