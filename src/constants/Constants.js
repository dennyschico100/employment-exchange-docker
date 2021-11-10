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

const USER_TYPES = {
  Admin: 'Admin',

  // Permisos para Templates
  Read_Templates: 'Read_Templates',
  Write_Templates: 'Write_Templates',
  Delete_Templates: 'Delete_Templates',

  // Permisos para Certificados
  Read_Certs: 'Read_Certs',
  Write_Certs: 'Write_Certs',
  Delete_Certs: 'Delete_Certs',

  // Permisos para Delegaciones
  Read_Delegates: 'Read_Delegates',
  Write_Delegates: 'Write_Delegates',

  // Permisos para Registro de DIDs
  Read_Dids_Registers: 'Read_Dids_Registers',
  Write_Dids_Registers: 'Write_Dids_Registers',

  // Permisos para Perfiles
  Read_Profiles: 'Read_Profiles',
  Write_Profiles: 'Write_Profiles',
  Delete_Profiles: 'Delete_Profiles',

  // Permisos para Usuarios
  Read_Users: 'Read_Users',
  Write_Users: 'Write_Users',
  Delete_Users: 'Delete_Users',
};

const {
  Admin,
  Read_Templates,
  Write_Templates,
  Delete_Templates,
  Read_Certs,
  Write_Certs,
  Delete_Certs,
  Read_Delegates,
  Write_Delegates,
  Read_Dids_Registers,
  Write_Dids_Registers,
  Read_Profiles,
  Write_Profiles,
  Delete_Profiles,
  Read_Users,
  Write_Users,
  Delete_Users,
} = USER_TYPES;

const ALLOWED_ROLES = {
  Admin: [Admin],

  // Permisos para Templates
  Read_Templates: [
    Read_Templates,
    Write_Templates,
    Delete_Templates,
    Write_Certs,
    Read_Certs,
  ],
  Write_Templates: [Write_Templates],
  Delete_Templates: [Delete_Templates],

  // Permisos para Certificados
  Read_Certs: [Read_Certs, Write_Certs, Delete_Certs],
  Write_Certs: [Write_Certs],
  Delete_Certs: [Delete_Certs],

  // Permisos para Delegaciones
  Read_Delegates: [Read_Delegates, Write_Delegates],
  Write_Delegates: [Write_Delegates],

  // Permisos para Registro de DIDs
  Read_Dids_Registers: [
    Read_Dids_Registers,
    Write_Dids_Registers,
    Read_Certs,
    Write_Certs,
  ],
  Write_Dids_Registers: [Write_Dids_Registers],

  // Permisos para Perfiles
  Read_Profiles: [
    Read_Profiles,
    Write_Profiles,
    Delete_Profiles,
    Read_Users,
    Write_Users,
  ],
  Write_Profiles: [Write_Profiles],
  Delete_Profiles: [Delete_Profiles],

  // Permisos para Usuarios
  Read_Users: [Read_Users, Write_Users, Delete_Users],
  Write_Users: [Write_Users],
  Delete_Users: [Delete_Users],
};

const CERT_CATEGORY_TYPES = [
  'EDUCACION',
  'FINANZAS',
  'VIVIENDA',
  'IDENTIDAD',
  'BENEFICIOS',
  'LABORAL',
];

const CERT_CATEGORY_MAPPING = {
  EDUCACION: 'education',
  FINANZAS: 'finance',
  VIVIENDA: 'livingPlace',
  IDENTIDAD: 'identity',
  BENEFICIOS: 'benefit',
  LABORAL: 'work',
};

const { DIDI_API } = process.env;

const STATUS = {};

module.exports = {
  API_VERSION: '1.0',
  DEBUGG,

  VALIDATION_TYPES: {
    TOKEN_MATCHES_USER_ID: 'tokenMatchesUserId',
    IS_ARRAY: 'isArray',
    IS_STRING: 'isString',
    IS_BOOLEAN: 'isBoolean',
    IS_PASSWORD: 'isPassword',
  },

  DATA_TYPES: {
    CERT: 'cert',
    OTHERS: 'others',
    PARTICIPANT: 'participant',
  },

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

  CERT_CATEGORY_MAPPING,
  CERT_CATEGORY_TYPES,

  ALLOWED_ROLES,

  CERT_FIELD_MANDATORY: {
    DID: 'DID',
    NAME: 'CREDENCIAL',
    FIRST_NAME: 'NOMBRE',
    LAST_NAME: 'APELLIDO',
    EXPIRATION_DATE: 'EXPIRATION DATE',
  },

  DIDI_API,
  MONGO_URL,
  PORT,
  ADDRESS,
  FULL_URL,

  ENABLE_INSECURE_ENDPOINTS,
};
