const fetch = require('node-fetch');

module.exports = async (req, res, next) => {
  try {
    if(req.session) {
      req.session.destroy((error) => {
        if (error) {
          res.status(error.status || 500);
        }
      });
    }

    const response = await fetch(
      `${process.env.REACT_APP_AUTH0_DOMAIN_V2}/logout`,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.log(err);
  }
};