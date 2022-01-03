const log = require('pino')();
const app = require('./app');
const Messages = require('./constants/Messages');

const main = () => {
  app.listen(app.get('PORT'), () => {
    log.info(`${Messages.INDEX.MSG.RUNNING_ON} ${app.get('PORT')}`);
  });
};
main();
