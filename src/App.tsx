import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import handleErrors from './utils/handleErrors';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

declare global {
  interface Window {
    csrfToken:any;
  }
}

function App() {
  const { search } = window.location || {};
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch('/api/verifyUser',{
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': window.csrfToken },
      credentials: 'include',
      cache: "no-cache"
    }).then(handleErrors).then(result => {
      setUser(result);
    }).catch(err => {
      console.log('verify error : ', err);
    });
  }, []);

  useEffect(() => {
    if(!user && search) {
      const queryObj = search.replace('?', '').split('&').reduce((acc, item) => {
        const [ key, value ] = item.split('=');
        // @ts-ignore
        acc[key] = value;
        return acc;
      }, {});
      const sessionObj = sessionStorage.getItem('a0.spajs.txs');
      if(sessionObj) {
        const body = {
          ...queryObj,
          code_verifier: JSON.parse(sessionObj).code_verifier
        }
        fetch(`/api/access`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json', 'x-csrf-token': window.csrfToken },
          credentials: 'include'
        })
          .then(handleErrors)
          .then(result => {
            setUser(result);
          })
          .catch(e => {
            console.log('error: ', e);
          })
        sessionStorage.removeItem('a0.spajs.txs');
      }
    }
  }, [search, user]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
