const usuarios = require("./../models/usuarios");

exports.list = function list(req, res, next) {
  console.log(usuarios);
  //res.json({ usuarios: JSON.stringify(usuarios) });
  res.json(usuarios);
};

exports.pedidos = function pedidos(req, res) {
  //TODO: Refactoring con /pedidos
  pedidosUsuario = pedidos.filter(
    (p) => req.usuario.admin || p.usuario == req.usuario.username
  );
  console.log(pedidosUsuario);
  res.send(pedidosUsuario);
};

exports.borrado = function borrado(req, res) {
  //TODO: Modularizar
  let usuario = req.usuario;
  let index = req.usuarioIndex;
  let indexABorrar = req.params.id;
  // Recuperación de datos del usuario a borrar
  usuarioABorrar = usuarios[indexABorrar];
  console.log(indexABorrar, usuarioABorrar);
  if (!usuarioABorrar) {
    res.status(404).send({ resultado: `Usuario a borrar no encontrado` });
  }
  resultado = "Borrado según el indice: " + usuarioABorrar;
  usuarioABorrar.borrado = true;
  res.send({ resultado: resultado, valor: usuarioABorrar });
};
