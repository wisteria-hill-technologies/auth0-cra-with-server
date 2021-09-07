const { randomBytes } = require('crypto');

module.exports = async (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
};