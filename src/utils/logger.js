const pino = require('pino');

exports.log = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  prettyPrint: { colorize: true },
});

