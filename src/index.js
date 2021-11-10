const log = require('pino')();
const app = require('./app');

const main = () => {
  app.listen(app.get('PORT'), () => {
    log.info(`server running on port ${app.get('PORT')}`);
  });
};
main();
