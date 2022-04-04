require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressPinoLogger = require('express-pino-logger');

const Messages = require('./constants/Messages');
const Constants = require('./constants/Constants');
const UserRoutes = require('./routes/UserRoutes');
const OfferRoutes = require('./routes/OfferRoute');
const { log } = require('./utils/logger');

const loggerMidlleware = expressPinoLogger({
  logger: log,
  autoLogging: true,
});
const app = new Express();

app.use(Express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(loggerMidlleware);

mongoose
  .connect(`${Constants.MONGO_URL_LOCAL}`, {
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
app.use('/api/users', UserRoutes);
app.use('/api/offers', OfferRoutes);
/*  var foo = 1;
  console.log(foo);
  var bar;
  bar = 1;
function test() {
  console.log(baz);
}
var baz = 123; */

module.exports = app;
