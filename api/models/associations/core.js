const PedidosModel = require("../pedidos");
const UsuariosModel = require("../usuarios");
const ProductosModel = require("../productos");
const FormasDePagoModel = require("../formaDePago");
//const sequelize = require("../../../config/db");

console.log('Ejecución de asociaciones!')
// Agregado de relaciones

// El atributo usuario_id se agrega en el modelo origen (pedidos)
// El pedido pertenece a un usuario
PedidosModel.belongsTo(UsuariosModel);
UsuariosModel.hasMany(PedidosModel);

// // Creación de nueva entidad de vinculo
PedidosModel.belongsToMany(ProductosModel, {
  through: "pedidos_productos",
  foreignKey: "pedido_id", // replaces `productId`
  otherKey: "producto_id", // replaces `categoryId`
});

try {
  ProductosModel.belongsToMany(PedidosModel, {
  through: "pedidos_productos",
  foreignKey: "producto_id", // replaces `categoryId`
  otherKey: "pedido_id", // replaces `productId`
});
} catch (error) {
  console.log(error)
}


console.log('Fin de asociaciones!' )