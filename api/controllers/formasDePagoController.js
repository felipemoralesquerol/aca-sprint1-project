const httpMessage = require("./../helpers/httpMessage");
const formasDePago = require("../models/formaDePago");

const cache = require("../../config/cache");
const itemCache = "formasDePago";

exports.list = async function list(req, res, next) {
  try {
    cache.get(itemCache, async (error, info) => {
      if (error) {
        httpMessage.Error(req, res, error);
      }
      if (info) {
        console.log(info);
        res.json({ formasDePago: JSON.parse(info) });
      } else {
        const data = await formasDePago.findAll();
        console.log(data);
        res.json({ [itemCache]: data });

        // Agregado de clave en redis
        cache.set(itemCache, JSON.stringify(data), "EX", "600");

        // Resuesta
        res.json({ [itemCache]: data });
      }
    });
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

    //Borrado de clave para que se recargue en nueva operacion que lo necesite
    cache.del(itemCache);

    res.json({ status: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.borrar = async function borrar(req, res, next) {
  try {
    let { codigo } = req.params;
    const info = { codigo };

    const data = await formasDePago.findOne({ where: info });
    if (data.borrado) {
      texto = "Dato borrado anteriomente: " + codigo + " - " + data.nombre;
      console.log(texto);
      res.status(410).json({ status: texto }); // contenido borrado
    } else {
      data.borrado = true;
      await data.save();

      //Borrado de clave para que se recargue en nueva operacion que lo necesite
      cache.del(itemCache);

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

exports.actualizar = async function actualizar(req, res, next) {
  try {
    let { codigo, nombre } = req.body;
    const info = { codigo, nombre };

    const data = await formasDePago.findOne({ where: { codigo: codigo } });
    if (data.borrado) {
      texto =
        "No se puede modificar porque esta borrado: " +
        codigo +
        " - " +
        data.nombre;
      console.log(texto);
      res.status(410).json({ status: texto }); // contenido borrado
    } else {
      data.nombre = nombre;
      await data.save();

      //Borrado de clave para que se recargue en nueva operacion que lo necesite
      cache.del(itemCache);

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
