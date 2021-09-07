const fetch = require('node-fetch');
const processResponse = require('../../utils/processResponse');

module.exports = async (req, res, next) => {
  console.log('getuserDetails endpoint')
  console.log('req.session.csrfToken >>>', req.session.user.csrfToken)
  console.log('req.session.user >>>', req.session.user)
  // const userDetailsByIdUrl = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.sub}`;
  // //
  // const metadataResponse = await fetch(userDetailsByIdUrl, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // const response = await fetch(
  //   `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(body),
  //     headers: { 'Content-Type': 'application/json' }
  //   }
  // );
  //
  // const { data, error } = await processResponse(response, {
  //   message: 'Unable to login'
  // });
  //
  // if (error) {
  //   console.log('error >>', error);
  //   next(error);
  // }
  // // if get successful response, then get user and create a session.
  // req.session.user = data;
  // res
  //   .status(response.status)
  //   .json({ success: true });
  res.status(200).json({ user: {
      name: 'test user 1',
      email: 'test@test.com'
    }})
};
