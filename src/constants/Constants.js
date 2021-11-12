const DEBUGG = process.env.DEBUGG_MODE;
const { MONGO_DIR } = process.env;
const { MONGO_PORT } = process.env;
const MONGO_USER = process.env.MONGO_USERNAME;
const { MONGO_PASSWORD } = process.env;
const { MONGO_DB } = process.env;

const { ENABLE_INSECURE_ENDPOINTS } = process.env;

const { ADDRESS } = process.env;
const { PORT } = process.env;
const { FULL_URL } = process.env;
const MONGO_URL = `${MONGO_DIR}:${MONGO_PORT}/${MONGO_DB}`;

const USER_TYPES = {};

const { Admin } = USER_TYPES;

const STATUS = {};

module.exports = {
  API_VERSION: '1.0',
  DEBUGG,
  TYPE_MAPPING: {
    Email: 'Email',
    Telefono: 'Phone',
    Dni: 'dni',
    Nacionalidad: 'nationality',
    Nombres: 'names',
    Apellidos: 'lastNames',
    Direccion: 'streetAddress',
    Calle: 'numberStreet',
    Piso: 'floor',
    Departamento: 'department',
    'Codigo Zip': 'zipCode',
    // Ciudad: "city",
    // Municipalidad: "municipality",
    // Provincia: "province",
    Pais: 'country',
  },

  COMMON_PASSWORDS: ['123456', 'contraseña', 'password'],
  PASSWORD_MIN_LENGTH: 6,
  SALT_WORK_FACTOR: 16,

  PREVIEW_ELEMS_LENGTH: {
    1: 2,
    2: 4,
    3: 6,
    4: 6,
  },

  USER_TYPES,

  USER_FIELD_MANDATORY: {
    NAME: 'CREDENCIAL',
    FIRST_NAME: 'NOMBRE',
    LAST_NAME: 'APELLIDO',
    EXPIRATION_DATE: 'EXPIRATION DATE',
  },

  MONGO_URL,
  PORT,
  ADDRESS,
  FULL_URL,

  ENABLE_INSECURE_ENDPOINTS,
};
