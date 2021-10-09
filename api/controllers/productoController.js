const httpMessage = require("./../helpers/httpMessage");
const productos = require("../models/productos");

const cache = require("../../config/cache");
const itemCache = "productos";

exports.get = async (req, res, next) => {
  try {
    cache.get(itemCache, async (error, info) => {
      if (error) {
        httpMessage.Error(req, res, error);
      }
      if (info) {
        //console.log(info);
        res.json({ productos: JSON.parse(info) });
      } else {
        const data = await productos.findAll();
        //console.log(data);

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

exports.post = async (req, res, next) => {
  try {
    // TODO: Sanetizar y validar body

    const data = await productos.create(req.body);
    console.log(data);

    //Borrado de clave para que se recargue en nueva operacion que lo necesite
    cache.del(itemCache);

    res.json({ status: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let { codigo } = req.params;
    const info = { codigo };

    const data = await productos.findOne({ where: info });
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
          "Procucto borrado correctamente: " + codigo + " - " + data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const codigo = req.params.codigo;
    let { nombre, descripcion, precioVenta, foto } = req.body;
    const info = { codigo, nombre };

    const data = await productos.findOne({ where: { codigo: codigo } });
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
      data.descripcion = descripcion;
      data.precioVenta = precioVenta;
      data.foto = foto;
      await data.save();

      //Borrado de clave para que se recargue en nueva operacion que lo necesite
      cache.del(itemCache);

      res.json({
        status:
          "Producto actualizado correctamente: " + codigo + " - " + data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};
