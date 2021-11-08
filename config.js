const config = require('dotenv').config;
config();
export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/',
  PORT: process.env.PORT || 4000,
};
