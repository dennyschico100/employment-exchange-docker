const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Hashing = require("./utils/Hashing");
const HashedData = require("./utils/HashedData");
const {pino}= require('../utils/logger')

const Messages = require("../constants/Messages")
const userSchema = new Schema({
  nombres: { type: String },
  apellidos: { type: String },
  email: {
    type: String,
  },
  password: HashedData,
  pais: { type: String },
  departamento: { type: String },
  municipio: { type: String },
  genero: { type: String },
  telefono: { type: Number },
  fecha_nacimiento: { type: String },
  isCandidate: { type: Boolean },
  
  deleted: { type: Boolean, default: false },
});
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};
/*userSchema.statics.comparePassword = async (password, receivedPassword) => {
  const valid_password = await bcrypt.compare(password, receivedPassword);
  return valid_password;
};*/

userSchema.methods.comparePassword = async function(candidatePassword) {
	try {
		const result = await Hashing.validateHash(candidatePassword, this.password);
		return result;
	} catch (err) {
		console.log(`[UserSchema - comparePassword]: JSON.stringify(err)`);
		throw err;
	}
};


const UserModel = model("User", userSchema);
module.exports = UserModel;


UserModel.getByEmail = async function(email) {
	try {
		const res = await UserModel.findOne({ email, deleted: false });
		return res;
	} catch (err) {
		pino.info(`[User - getByName]: JSON.stringify(err)`);
		throw err;
	}
};

UserModel.generate = async ({
  nombres,
  apellidos,
  email,
  password,
  pais,
  departamento,
  municipio,
  genero,
  telefono,
  fecha_nacimiento,
  isCandidate,
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
    user.pais = pais;
    user.departamento = departamento;
    user.municipio = municipio;
    user.genero = genero;
    user.fecha_nacimiento = fecha_nacimiento;

    user.telefono = telefono;
    user.isCandidate=isCandidate;
    user = await user.save();
    return user;
  } catch (error) {
    console.log(`[User - generate ] JSON.stringify(err)`);
    throw error;
  }
};
