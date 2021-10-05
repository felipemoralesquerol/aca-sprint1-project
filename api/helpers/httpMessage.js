module.exports = {
  Message(message, res) {
    // TODO: Enviar email
    // TODO: Enlazar error con tracking tool
    // TODO:
    console.log("Mensaje interno: " + message);
    res.status(200).send({ status: message });
  },

  Error(req, res, err) {
    // TODO: Enviar email
    // TODO: Enlazar error con tracking tool
    // TODO:
    console.error("Error interno: " + err.message);
    res.status(500).send({ status: "Error interno." });
  },

  Denied(req, res, err) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error(err);
    res
      .status(403)
      .send({ status: "Access denied o credenciales incorrectas." });
  },

  NotAccess(req, res) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error("Access denied or unauthorized.");
    res.status(401).send({ status: "Access denied or unauthorized." });
  },

  NotFound(message, res) {
    // TODO: Enviar emails
    // TODO: Volcar esta información en un archivo de log
    // TODO: Internacionalizar (i18n)
    console.error("Dato no encontrado : " + message);
    res.status(404).send({ status: message });
  },
};
