const fetch = require('node-fetch');
const processResponse = require('../../utils/processResponse');
const jwt_decode = require('jwt-decode');

module.exports = async (req, res, next) => {
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
  const { access_token, id_token } = data || {};
  const decodedAccessToken = jwt_decode(access_token);
  console.log('decodedAccessToken >>', decodedAccessToken);
  const userDetailsByIdUrl = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${decodedAccessToken.sub}`;
  const metadataResponse = await fetch(userDetailsByIdUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const { data: metaData, error: metaDataError } = await processResponse(metadataResponse, {
    message: 'Unable to login'
  });

  if (metaDataError) {
    console.log('metaDataError >>', metaDataError);
    next(metaDataError);
    return;
  }
  console.log('metaData >>>', metaData);

  req.session.user = { tokenData: data, metaData };
  const { name, email, picture } = metaData || {};
  res
    .status(response.status)
    .json({ name, email, picture });
};
