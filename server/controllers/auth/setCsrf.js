const { randomBytes } = require('crypto');

module.exports = (req, res, next) => {
  const csrfToken = randomBytes(100).toString('base64');
  console.log('req.session.user >>>', req.session.user)
  // req.session.csrfToken = csrfToken;
  // console.log('set csrf session csrfToken!!!!!!!!!!!', req.session.csrfToken)
  // console.log('req.session.user >>>', req.session.user)
  next();
};
