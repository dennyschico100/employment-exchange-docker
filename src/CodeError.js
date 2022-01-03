class CodeError extends Error {
  constructor({ code, message }) {
    super(message);
    this.error = message;
    this.code = code;
  }
}

module.exports = CodeError;
