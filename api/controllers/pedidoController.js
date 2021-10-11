const httpMessage = require("./../helpers/httpMessage");
const pedidos = require("../models/pedidos");

exports.get = async (req, res, next) => {
  try {
    //const filtro = req.authData.admin? `{ where: {}}`
    //(p) => req.authData.admin || p.usuario == req.authData.username
    const data = await pedidos.findAll();
    console.log(data);
    res.json({ pedidos: data });
    //res.json(data);
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.post = async (req, res, next) => {
  try {
    let { direccion } = req.body.direccion;
    //     usuario = req.usuario;
    //     console.log(req.body);
    //     if (!formaDePago in ["EF", "TC", "TD", "MP"]) {
    //       return res
    //         .status(404)
    //         .send({ resultado: `Forma de pago incorrecta: ${formaDePago}` });
    //     }
    //     direccionEnvio = direccionEnvio || usuario.direccionEnvio;
    //     pedido = new Pedido(usuario.username, formaDePago);
    //     pedido.setDireccionEnvio(direccionEnvio);
    //     //Agregado de pedido a la lista global de pedidos
    //     addPedido(pedido);
    //     console.log(pedidos);
    //     res.send(pedido);
    const cant = await pedidos.count();

    const data = await pedidos.create({ numero: cant + 1, usuarioid: req.authData.usernameID, direccion });
    console.log(data);
    res.json({ status: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};
// exports.pedidos = function pedidos(req, res) {
//   //TODO: Refactoring con /pedidos
//   pedidosUsuario = pedidos.filter(
//     (p) => req.usuario.admin || p.usuario == req.usuario.username
//   );
//   console.log(pedidosUsuario);
//   res.send(pedidosUsuario);
// };

// exports.borrado = function borrado(req, res) {
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
// };
