const mongoose = require("mongoose");
const UserModel = require("../models/User");
const Messages = require("../constants/Messages");
const { USER } = require("../constants/Messages");
const {pino} = require('../utils/logger')
const TokenService = require('../services/TokenService')

module.exports.login = async ({email,password}) => {
  let user;
  try {

    user = await UserModel.getByEmail(email)

    pino.info('en el login del user service')
    pino.info('Datos '+user)
    if(!user){
      throw USER.ERR.INVALID_USER
    }

  } catch (error) {
    pino.error(`[UserService - login]: JSON.stringify(err)`);
		pino.info(`USUARIO CON EMAIL ${email}, NO ENCONTRADO`);
		throw Messages.USER.ERR.INVALID_USER;
    
  }
  try {
    const isMatch = user.comparePassword(password)
    if(!isMatch){
      pino.error('PASSWORD DOES NOT MATCH')

      throw USER.ERR.INVALID_USER
    }
    pino.info('USUARIO LOGEADO')

    return {user,token:TokenService.generateToken(user._id)}

  } catch (error) {
    
    pino.error(`[UserService - login]: segundo catch`);
		throw Messages.USER.ERR.INVALID_USER;
    
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
    console.log("catch del service");
    console.log(error);
    //throw Messages.USER.ERR.CREATE;
  }
};
