const mongoose = require('mongoose');
const UserModel = require('../models/User');
const Messages = require('../constants/Messages');
module.exports.login = async (args) => {
  let user = [...args];
};

module.exports.create = async (_user) => {
  try {
    //let user = [...args];
    console.log('mi objeto _user');
    console.log(_user);

    const user = await UserModel.findOne({ email: { $eq: _user.email } });
    if (!user) {
      const res = await UserModel.generate(_user);
      return res;
    }
  } catch (error) {
    console.log('catch del service');
    console.log(error);
    //throw Messages.USER.ERR.CREATE;
  }
};
