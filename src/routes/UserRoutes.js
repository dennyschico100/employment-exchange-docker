const router = require('express').Router();
const Constants = require('../constants/Constants');
const Validator = require('../utils/Validator');
const UserService = require('../services/UserService');
const { log } = require('../utils/logger');

const { sendRes, sendErr } = require('../utils/ResponseHandler');

router.get('/', (req, res) => {
  res.json({ message: 'all users' });
});

router.post(
  '/',
  Validator.validate([
    {
      name: 'nombres',
      validate: [Constants.VALIDATION_TYPES.IS_STRING],
      // eslint-disable-next-line no-dupe-keys
      name: 'email',
      // eslint-disable-next-line no-dupe-keys
      validate: [Constants.VALIDATION_TYPES.IS_EMAIL],
    },
  ]),
  Validator.checkValidationResult,
  async (req, res) => {
    try {
      const newUser = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        pais: req.body.pais,
        departamento: req.body.departamento,
        municipio: req.body.municipio,
        genero: req.body.genero,
        fecha_nacimiento: req.body.fecha_nacimiento,
        telefono: req.body.telefono,
        isCandidate: true,
      };
      log.info('saving a new user');
      log.info(newUser);
      const result = await UserService.create(newUser);
      return sendRes(res, result);
    } catch (error) {
      log.error(error);
      return sendErr(res, error);
    }
  },
);
router.get(
  '/admin',
  Validator.validate([
    {
      name: 'token',
      validate: [Constants.USER_TYPES.Candidate],
      isHead: true,
    },
  ]),
  Validator.checkValidationResult,
  async (req, res) => {
    try {
      return sendRes(res, { message: 'TOKEN ACEPTADO' });
    } catch (error) {
      log.erro('ERROR AL SOLICITAR ADMIN');
      throw error;
    }
  },
);
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const resp = await UserService.login({ email, password });
    return sendRes(res, resp);
  } catch (error) {
    log.error(error);
    return sendErr(res, error);
  }
});
/*
router.post(
  '/',
  Validator.validate([
    {
      name: 'token',
      valite: [Constants.USER_TYPES.Write_Users],
      isHead: true,
    },
    {
      name: 'name',
      valite: [Constants.VALIDATION_TYPES.IS_STRING],
    },
    {
      name: 'password',
      validate: [
        Constants.VALIDATION_TYPES.IS_STRING,
        Constants.VALIDATION_TYPES.IS_PASSWORD,
      ],
      length: { min: Constants.PASSWORD_MIN_LENGTH },
    },
  ]),
  Validator.checkValidationResult,
  async (req, res) => {
    try {
      sendRes(res, {});
    } catch (error) {
      sendErr(res.err);
    }
  }
); */
module.exports = router;
