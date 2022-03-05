const DEBUGG = process.env.DEBUGG_MODE;
const { MONGO_DIR } = process.env;
const { MONGO_PORT } = process.env;
const MONGO_USER = process.env.MONGO_USERNAME;
const { MONGO_PASSWORD } = process.env;
const { MONGO_DB } = process.env;

const { ENABLE_INSECURE_ENDPOINTS } = process.env;
const {SERVER_PRIVATE_KEY}=process.env;
const { ADDRESS } = process.env;
const { PORT } = process.env;
const { FULL_URL } = process.env;
const { HASH_SALT } = process.env;
const {EMPLOYMENT_SERVER_MONGO_DB}= process.env
const MONGO_URL = `${MONGO_DIR}:${MONGO_PORT}/${MONGO_DB}`;

const USER_TYPES = {
  Candidate: "Candidate",
  // Permisos para Usuarios
  
};

const { Candidate } = USER_TYPES;

const STATUS = {};
const CERT_FIELD_TYPES = {
  Text: "Text",
  Paragraph: "Paragraph",
  Date: "Date",
  Number: "Number",
  Boolean: "Boolean",
  Checkbox: "Checkbox",
};
module.exports = {
  API_VERSION: "1.0",
  DEBUGG,
  COMMON_PASSWORDS: ["123456", "contraseña", "password"],
  PASSWORD_MIN_LENGTH: 6,
  USER_TYPES,
  CERT_FIELD_TYPES,
  USER_FIELD_MANDATORY: {
    NAME: "CREDENCIAL",
    FIRST_NAME: "NOMBRE",
    LAST_NAME: "APELLIDO",
    EXPIRATION_DATE: "EXPIRATION DATE",
  },
  VALIDATION_TYPES: {
    TOKEN_MATCHES_USER_ID: "tokenMatchesUserId",
    IS_ARRAY: "isArray",
    IS_STRING: "isString",
    IS_BOOLEAN: "isBoolean",
    IS_PASSWORD: "isPassword",
    IS_EMAIL: "isEmail",
  },

  MONGO_URL,
  PORT,
  ADDRESS,
  FULL_URL,
  HASH_SALT,
  SERVER_PRIVATE_KEY,
  EMPLOYMENT_SERVER_MONGO_DB,
  ENABLE_INSECURE_ENDPOINTS,
};
