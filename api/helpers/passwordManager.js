const bcrypt = require("bcrypt");
const authConfig = require("../../config/auth");
const httpMessage = require("../helpers/httpMessage");

module.exports = {
  encrypt(password) {
    // Encriptamos la contraseña
    return bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
  },

  comparePassword(passwordEncrypt, passwordBase) {
    try {
      return bcrypt.compareSync(passwordEncrypt, passwordBase);
    } catch (error) {
      httpMessage.Error(req, res, error);
    }
  },
};
