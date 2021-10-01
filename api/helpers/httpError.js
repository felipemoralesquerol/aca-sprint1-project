function httpError(req, res, err) {
  // TODO: Enviar email
  // TODO: Enlazar error con tracking tool
  // TODO: 
  console.error("Error interno: " + err.message);
  res.status(500).send({ status: "Error interno." });
}

module.exports = httpError;
