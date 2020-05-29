const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model.js');
const mongoose = require('mongoose');

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  try {
    const userDetails = await userModel.findOneUser({ _id: mongoose.Types.ObjectId(id) });
    done(null, userDetails);
  } catch (e) {
    throw e;
  }
});

// Local strategy
passport.use(new LocalStrategy(
    async (email, password, done) => {
      try {
        const result = await userModel.login({ email, password });
        if (!result) return done(null, false, 'Username or password incorrect');
        return done(null, result);
      } catch (e) {
        return done(e);
      }
    },
));
