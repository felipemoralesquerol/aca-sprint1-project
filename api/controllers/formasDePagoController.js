const httpMessage = require("./../helpers/httpMessage");
const formasDePago = require("../models/formaDePago");

exports.list = async function list(req, res, next) {
  try {
    const data = await formasDePago.findAll();
    console.log(data);
    res.json({ usuarios: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
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
    httpMessage.Error(req, res, error);
  }
};

exports.borrar = async function list(req, res, next) {
  try {
    let { codigo } = req.body;
    const info = { codigo };

    const data = await formasDePago.findOne({ where: info });
    if (data.borrado) {
      texto = "Dato borrado anteriomente: " + codigo + " - " + data.nombre;
      console.log(texto);
      res.json({ status: texto });
    } else {
      data.borrado = true;
      await data.save();
      res.json({
        status:
          "Forma de pago borrada correctamente: " +
          codigo +
          " - " +
          data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.actualizar = async function list(req, res, next) {
  try {
    let { codigo, nombre } = req.body;
    const info = { codigo, nombre };

    const data = await formasDePago.findOne({ where: codigo });
    if (data.borrado) {
      texto = "Dato borrado anteriomente: " + codigo + " - " + data.nombre;
      console.log(texto);
      res.json({ status: texto });
    } else {
      data.nombre = nombre;
      await data.save();
      res.json({
        status:
          "Forma de pago actualizada correctamente: " +
          codigo +
          " - " +
          data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};
