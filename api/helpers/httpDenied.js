function httpDenied(req, res, err) {
  // TODO: Enviar emails
  // TODO: Volcar esta información en un archivo de log
  // TODO: Internacionalizar (i18n)
  console.error(err);
  res.status(403).send({ status: "Access denied." });
}

module.exports = httpDenied;
