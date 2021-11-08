const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  nombres: { type: String },
  apellidos: { type: String },
  email: {
    type: String,
  },
  password: { type: String },
  confirmedpassword: { type: String },
  nacionalidad: { type: String },
  telefono: { type: Number },
  estado: { type: Number },
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
