require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // for logging
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const errorHandler = require('./controllers/errorHandler');

const index = require('./controllers/index');
const getSession = require('./controllers/auth/getSession');
const checkSession = require('./controllers/auth/checkSession');
const verifyUser = require('./controllers/auth/verifyUser');
const logout = require('./controllers/auth/logout');

app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser());

const ONE_DAY = 1000 * 60 * 60 * 24;
app.use(
  session({
    name: 'session',
    secret: 'add-your-secret-code-here',
    proxy: true,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      secure: process.env.ENVIRONMENT !== 'development', // if true: only transmit cookie over https
      sameSite: true,
      maxAge: +process.env.SESSION_LIFETIME || ONE_DAY // session max age in milliseconds e.g. 30 mins
    }
  })
);

const csrfProtection = csrf({ cookie: true });

app.use(cors({ credentials: true, origin: process.env.HOST_URL }));
// view engine setup
app.set('views', path.join(__dirname, 'build'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'build'), { index: false }));

app.get('/', csrfProtection, index);

app.use(csrfProtection); // any endpoints below this line will check for CSRF token.

app.get('/api/verifyUser', verifyUser);

app.post('/api/access', getSession);

app.use(checkSession);
// any endpoints below this line will check user session. If no user session, throw 401 error
// unless process.env.AUTH_CHECK is set false.
app.get('/api/logout', logout);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));