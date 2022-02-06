const router = require('express').Router();
const Constants = require('../constants/Constants');
const Validator = require('../utils/Validator');
const UserModel = require('../models/User');

const {
  sendRes,
  sendErrWithStatus,
  sendErr,
} = require('../utils/ResponseHandler');

router.get('/', (req, res) => {
  res.json({ message: 'all users' });
});

router.post('/', async (req, res) => {
  try {
    console.log('guardando usuario');
    const NEW_USER = {
      nombres: 'juan951',
      apellidos: 'perez',
      email: 'perez@gmail.com',
      password: '',
      confirmedpassword: '',
      nacionalidad: '',
      telefono: '',
      estado: 1,
    };
    const result = await UserModel.create(NEW_USER);
    return sendRes(res, result);
  } catch (error) {
    console.log(error);
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
