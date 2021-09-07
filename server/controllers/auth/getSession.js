const fetch = require('node-fetch');
const processResponse = require('../../utils/processResponse');

module.exports = async (req, res, next) => {
  console.log('/access! req.body: ', req.body);
  const { code, code_verifier, state } = req.body || {};
  const body = {
    grant_type: "authorization_code",
    client_id : process.env.AUTH0_CLIENT_ID,
    code,
    code_verifier,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
    state
  }

  const response = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }
  );

  const { data, error } = await processResponse(response, {
    message: 'Unable to login'
  });

  if (error) {
    console.log('error >>', error);
    next(error);
    return;
  }
  // if get successful response, then get user and create a session.
  req.session.user = data;
  res
    .status(response.status)
    .json({ picture: '', name: 'Noby', email: 'test@test.com' });
};
