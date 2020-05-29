// To access .env file values
require('dotenv').config();

// Importing libraries
const express = require('express');
const app = express();
const router = require('./config/route.config');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Initialising middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongodb service initialisation
const dbConnection = require('./services/database.service');

// Passport and session config
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: dbConnection }),
}));
app.use(passport.initialize());
app.use(passport.session());

// OAuth initialization
require('./services/auth.service');

// Router config
router(app);

// Listening in specified port
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server ${PORT}`);
});
