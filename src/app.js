require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Messsages = require('./constants/Messages');
const Constants = require('./constants/Constants');

const app = new express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.set('PORT', process.env.port || 3000);
app.get('/', (_, res) => {
  res.send(`${Messsages.INDEX.MSG.HELLO_WORLD} v${Constants.API_VERSION}`);
});

module.exports = app;
