const mongoose = require('mongoose');

// Initiate mongodb connectionß
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose connection object
const db = mongoose.connection;

// Error / Open handlers
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Db Connecion established');
});

module.exports = db;
