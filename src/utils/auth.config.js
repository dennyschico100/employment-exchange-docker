require('dotenv').config();

const { EMPLOYMENT_API_KEY } = process.env;

module.exports = {
  secret: EMPLOYMENT_API_KEY,
};
