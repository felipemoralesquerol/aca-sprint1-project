const jwt = require("jsonwebtoken");
const httpMessage = require("../helpers/httpMessage");
const passwordManager = require("../helpers/passwordManager");

const UsuariosModel = require("../models/usuarios");

// Login
exports.signin = async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log("signin", email, password);
    const usuario = await UsuariosModel.findOne({ where: { email: email } });

    if (!usuario) {
      httpMessage.NotFound("Credenciales incorrectas", res);
    } else {
      const compare = passwordManager.comparePassword(
        password,
        usuario.password
      );
      if (compare) {
        const data = jwt.sign(
          req.body,
          process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRES_IN },
          (err, token) => {
            if (err) {
              httpMessage.Error(req, res, err);
            } else {
              req.token = token;
              res.json({ status: "signin", token });
            }
          }
        );
      } else {
        httpMessage.NotAccess(req, res);
      }
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Registro
exports.signup = function signup(req, res, next) {
  try {
    // TODO: Implementar acceso a base de datos
    const { username, password, email } = req.body;
    console.log("signup", username, password, email);

    jwt.sign(
      req.body,
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          httpError(req, res, err);
        } else {
          req.token = token;
          res.json({ status: "signup", token });
        }
      }
    );
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

exports.authenticated = function authenticated(req, res, next) {
  // TODO: Implementar acceso a base de datos
  // NOTE: Requiere que la petición incluye en el campo headers una clave (key) de la forma
  //       Bearer {token}, donde este token haya sido suministrado por signin o signup
  try {
    if (!req.headers.authorization) {
      httpDenied(
        req,
        res,
        "Acceso denegado por falta de información de autorización"
      );
    } else {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if (err) {
          httpDenied(req, res, "Acceso denegado: " + err.message);
        } else {
          req.authData = authData;
          //TODO: Recuperar data del usuario

          next();
        }
      });
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Usuario es admin
exports.isAdmin = function me(req, res, next) {
  if (true) {
    //TODO: Validar cuando se recuperen los datos de la database
    //if (req.authData.username == "admin") {
    next();
  } else {
    console.error("Acceso denegado: ");
    res.status(403).send({ status: "Acceso denegado" });
  }
};

// Perfil de usuario
exports.me = function me(req, res, next) {
  res.json({ status: "me", data: req.authData });
};
