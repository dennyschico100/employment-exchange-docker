const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Hashing = require('./utils/Hashing');
const HashedData = require('./utils/HashedData');

const userSchema = new Schema({
  nombres: { type: String },
  apellidos: { type: String },
  email: {
    type: String,
  },
  password: HashedData,
  nacionalidad: { type: String },
  telefono: { type: Number },
  deleted: { type: Boolean, default: false },
});
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  const valid_password = await bcrypt.compare(password, receivedPassword);
  return valid_password;
};
const UserModel = model('User', userSchema);
module.exports = UserModel;

UserModel.generate = async ({
  nombres,
  apellidos,
  email,
  password,
  nacionalidad,
  telefono,
}) => {
  try {
    let user;
    const query = { email, deleted: false };
    user = await UserModel.findOne(query);

    if (!user) user = new UserModel();
    user.nombres = nombres;
    user.apellidos = apellidos;
    user.email = email;
    user.nombres = nombres;
    user.password = await Hashing.saltedHash(password);
    user.nacionalidad = nacionalidad;
    user.telefono = telefono;
    user = await user.save();
    return user;
  } catch (error) {
    console.log(`[User - generate ] JSON.stringify(err)`);
    throw error;
  }
};
