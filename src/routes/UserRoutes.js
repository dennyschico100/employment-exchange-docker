const router = require('express').Router();
const Constants = require('../constants/Constants');
const Validator = require('../utils/Validator');
const UserModel = require('../models/User');
const UserService = require('../services/UserService');
const log = require('pino')

const _pino = log({
  timestamp: log.stdTimeFunctions.isoTime,
  prettyPrint: { colorize: true }
});


const {
  sendRes,
  sendErrWithStatus,
  sendErr,
} = require('../utils/ResponseHandler');

router.get('/', (req, res) => {

  _pino.info(`[UserRoutes - get: / ]`);
  
  res.json({ message: 'all users' });
});

router.post('/', Validator.validate([{
  name:'nombres',validate:[Constants.VALIDATION_TYPES.IS_STRING]
}]) ,Validator.checkValidationResult, async (req, res) => {
  try {
    console.log('guardando usuario');
    /*const NEW_USER = {
      nombres: 'juan951',
      apellidos: 'perez',
      email: 'perez@gmail.com',
      password: '',
      confirmedpassword: '',
      nacionalidad: '',
      telefono: '',
      estado: 1,
    };*/
    const newUser = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: req.body.password,
      pais: req.body.pais,
      departamento: req.body.departamento,
      municipio: req.body.municipio,
      genero: req.body.genero,
      fecha_nacimiento:req.body.fecha_nacimiento,
      telefono: req.body.telefono,
    };
    _pino.info(newUser);
    
    const result = await UserService.create(newUser);
    return sendRes(res, result);
  } catch (error) {
    console.log(error);
    _pino.error(`[UserRoutes - get: / ] ${error}`)
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
