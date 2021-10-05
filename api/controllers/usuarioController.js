const httpMessage = require("./../helpers/httpMessage");
const usuarios = require("../models/usuarios");

exports.list = async function list(req, res, next) {
  try {
    const data = await pedidos.findAll();
    console.log(data);
    res.json({ usuarios: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.pedidos = function pedidos(req, res) {
  //   //TODO: Refactoring con /pedidos
  //   pedidosUsuario = pedidos.filter(
  //     (p) => req.usuario.admin || p.usuario == req.usuario.username
  //   );
  //   console.log(pedidosUsuario);
  httpMessage.Message("usuarios.pedidos: opción no implementada");
};

exports.borrado = function borrado(req, res) {
  //   //TODO: Modularizar
  //   let usuario = req.usuario;
  //   let index = req.usuarioIndex;
  //   let indexABorrar = req.params.id;
  //   // Recuperación de datos del usuario a borrar
  //   usuarioABorrar = usuarios[indexABorrar];
  //   console.log(indexABorrar, usuarioABorrar);
  //   if (!usuarioABorrar) {
  //     res.status(404).send({ resultado: `Usuario a borrar no encontrado` });
  //   }
  //   resultado = "Borrado según el indice: " + usuarioABorrar;
  //   usuarioABorrar.borrado = true;
  //   res.send({ resultado: resultado, valor: usuarioABorrar });
  httpMessage.Message("usuarios.borrado: opción no implementada");
};
