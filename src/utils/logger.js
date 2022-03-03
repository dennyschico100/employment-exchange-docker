const log = require("pino");
exports.pino = log({
  timestamp: log.stdTimeFunctions.isoTime,
  prettyPrint: { colorize: true },
});

