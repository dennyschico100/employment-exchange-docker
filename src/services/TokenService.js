const jwt = require("jsonwebtoken");
const Constants = require('../constants/Constants')
const Messages = require("../constants/Messages");
const {secret} = require('../utils/auth.config')
require("dotenv").config();

const now = function() {
	return Math.floor(Date.now() / 1000);
};

// genera token firmado
module.exports.generateToken = function(userId) { 
    
	const token = jwt.sign({ userId, exp: now() + 60 * 60 * 60 * 60 }, secret);
	return token;
};

// valida el token y retorna el userId
module.exports.getTokenData = function(token) {
	const decoded = jwt.verify(token,secret);
	if (decoded.exp && decoded.exp > now()) {
		return { userId: decoded.userId };
	}
	throw Error(Messages.VALIDATION.INVALID_TOKEN);
};
