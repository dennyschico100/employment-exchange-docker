require('dotenv').config();
const express = require('express');
const UserModel = require('./models/User');

const app = new express();
app.set('PORT', process.env.port || 3000);
app.get('/', (req, res) => {
  res.send({ message: 'welcome' });
});

module.exports = app;
