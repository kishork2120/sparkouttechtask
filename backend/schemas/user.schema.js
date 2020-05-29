const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applicationConfig = require('../config/application.config');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

// User schema definitiation
// TODO : Usermanagement
const UserSchema = new Schema({
  name: {
    type: String,
    min: [3, 'Minimum 3 characters required'],
    max: [30, 'Maximum 30 characters allowed'],
    required: [true, 'Name requied'],
  },
  email: {
    type: String,
    min: [10, 'Minimum 10 characters required'],
    max: [50, 'Maximum 50 characters allowed'],
    unique: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, 'Email requied'],
  },
  phone: {
    type: String,
    min: [4, 'Minimum 4 numbers required'],
    max: [12, 'Maximum 12 numbers allowed'],
    unique: true,
    required: [true, 'Phone requied'],
  },
  age: {
    type: Number,
    min: [13, 'Minimum age allowed: 13'],
    required: [true, 'Age requied'],
  },
  industry: {
    type: String,
    min: [3, 'Minimum 3 characters required'],
    max: [30, 'Maximum 30 characters allowed'],
  },
  password: {
    type: String,
    required: [true, 'Passwrod required'],
  },
  createdDate: { type: Date, default: Date.now },
});

// unique mongoose plugin
UserSchema.plugin(uniqueValidator, { message: '{PATH} aleady exists' });

// Exected before saving file
UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(applicationConfig.SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Schema methods for comparing incoming passwrods
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

// Exporting user model
module.exports = mongoose.model('User', UserSchema);
