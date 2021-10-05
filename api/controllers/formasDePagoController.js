const httpError = require("./../helpers/httpMessage");
const formasDePago = require("../models/formaDePago");

exports.list = async function list(req, res, next) {
  try {
    const data = await formasDePago.findAll();
    console.log(data);
    res.json({ usuarios: data });
  } catch (error) {
    httpError(req, res, error);
  }
};

exports.agregar = async function list(req, res, next) {
  try {
    let { codigo, nombre } = req.body;
    const info = { codigo, nombre };

    const data = await formasDePago.create(info);
    console.log(data);
    res.json({ status: data });
  } catch (error) {
    httpError(req, res, error);
  }
};
