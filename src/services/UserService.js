const mongoose = require("mongoose");
const UserModel = require("../models/User");
const Messages = require("../constants/Messages");
const { USER } = require("../constants/Messages");
const { log } = require("../utils/logger");
const TokenService = require("../services/TokenService");

module.exports.login = async ({ email, password }) => {
  let _user;
  try {
    _user = await UserModel.getByEmail(email);

    log.info("en el login del user service");

    if (!_user) {
      throw USER.ERR.INVALID_USER;
    }
  } catch (error) {
    log.info(`USUARIO CON EMAIL ${email}, NO ENCONTRADO`);
    throw Messages.USER.ERR.INVALID_USER;
  }
  try {
    const isMatch = await _user.comparePassword(password);
    if (!isMatch) {
      log.error("PASSWORD DOES NOT MATCH");

      throw USER.ERR.INVALID_USER;
    }

    let user = {
      nombres: _user.nombres,
      apellidos: _user.apellidos,
      email: _user.email,
      pais: _user.pais,
      departamento: _user.departamento,
      municipio: _user.municipio,
      genero: _user.genero,
      fecha_nacimiento: _user.fecha_nacimiento,
      telefono: _user.telefono,
    };

    return { user, token: TokenService.generateToken(_user._id) };
  } catch (error) {
    log.error(`[UserService - login]: segundo catch`);
    throw error;
  }
};

module.exports.getById = async function(userId) {
	let user;
	try {
    
		user = await UserModel.find({_id:userId});
		if (!user) throw Messages.USER.ERR.GET ;
		return user;
	} catch (err) {
		
		throw Messages.USER.ERR.GET;
	}
};
module.exports.create = async (_user) => {
  try {
    //let user = [...args];

    const user = await UserModel.findOne({ email: { $eq: _user.email } });
    if (!user) {
      const res = await UserModel.generate(_user);
      return res;
    }
    return USER.ERR.UNIQUE_EMAIL;
  } catch (error) {
    
    log.error(error);
    throw Messages.USER.ERR.CREATE;
  }
};
