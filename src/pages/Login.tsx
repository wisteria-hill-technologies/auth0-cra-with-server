import React, { FC, useEffect, useState } from 'react';
import base64URLEncode from '../utils/base64URLEncode';
import crypto from 'crypto';
import sha256 from '../utils/sha256';
import Profile from '../components/profile';

interface LoginProps {
  user: any;
}

const Login: FC<LoginProps> = ({ user }) => {

  const loginWithAuth0 = () => {
    const code_verifier = base64URLEncode(crypto.randomBytes(32));
    const challenge = base64URLEncode(sha256(code_verifier));
    const state = base64URLEncode(crypto.randomBytes(32));
    const nonce = base64URLEncode(crypto.randomBytes(32));

    const auth0Values = {
      nonce,
      code_verifier,
      scope: process.env.REACT_APP_SCOPE,
      audience: process.env.REACT_APP_AUDIENCE,
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI
    };

    sessionStorage.setItem('a0.spajs.txs', JSON.stringify(auth0Values));

    const auth0LoginUrl =
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?audience=${process.env.REACT_APP_AUDIENCE}&scope=${process.env.REACT_APP_SCOPE}&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH0_REDIRECT_URI}&response_type=code&response_mode=query&state=${state}&nonce=${nonce}&code_challenge=${challenge}&code_challenge_method=S256&auth0Client=${process.env.REACT_APP_AUTH0_CLIENT}`

    window.location.href = auth0LoginUrl;
  };

  const logout = () => {
    console.log('logout!');
    // setIsAuthenticated(false);
  }

  return (
    <div>
      <h1>Log In Page</h1>
      <div>
        {
          !user ? (
            <button onClick={loginWithAuth0}>
              Log In
            </button>
          ) : (
            <div>
              <Profile user={user} />
              <div>
                <button onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Login;