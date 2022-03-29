const pino = require("pino");
const pretty = require("pino-pretty");

const stream = pretty({
  colorize: true,
});
exports.log = pino(stream);
