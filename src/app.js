const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const Messages = require('./constants/Messages');
const Constants = require('./constants/Constants');
const UserRoutes = require('./routes/UserRoutes');
const { log } = require('./utils/logger');

const app = new express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
mongoose
  .connect(Constants.MONGO_LOCAL_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => log.info(Messages.INDEX.MSG.CONNECTED))
  .catch((err) => {
    log.error(Messages.INDEX.ERR.CONNECTION + err.message);
  });

app.set('PORT', process.env.port || 3000);
app.get('/', (_, res) => {
  res.send(`${Messages.INDEX.MSG.HELLO_WORLD} v${Constants.API_VERSION}`);
});
app.use('/users', UserRoutes);
module.exports = app;
