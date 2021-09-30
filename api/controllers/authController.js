const jwt = require("jsonwebtoken");
const httpError = require("../helpers/httpError");
const httpDenied = require("../helpers/httpDenied");

// Login
exports.signin = function signin(req, res, next) {
  try {
    // TODO: Implementar acceso a base de datos
    const { email, password } = req.body;
    console.log("signin", email, password);

    // TODO: Verificar credenciales de usuario en base de datos
    // if (
    //   (username != "felipe" || password != "1234") &&
    //   (username != "juangomez" || password != "1234")
    // ) {
    //   console.error("Error de credenciales: ");
    //   res
    //     .status(401)
    //     .send({ status: "Error de credenciales. Acceso denegado" });
    // }

    jwt.sign(
      req.body,
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          console.error("Error interno: " + err.message);
          res.status(500).send({ status: "Error interno" });
        } else {
          req.token = token;
          res.json({ status: "signin", token });
        }
      }
    );
  } catch (err) {
    httpError(req, res, err);
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
    httpError(req, res, err);
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
    httpError(req, res, err);
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
