//console.log('Información de Ambiente: ' + process.env.NODE_ENV);

// carga de información adicional
const ProductosModel = require("./productos");
const PedidosModel = require("./pedidos");
const FormasDePagoModel = require("./formaDePago");
const UsuariosModel = require("./usuarios");

require("../models/associations/core");

/*  *********************** FORMAS DE PAGO************************ */
// formasDePago = [
//   new FormasDePago("EF", "Efectivo"),
//   new FormasDePago("TC", "Tarjeta de Crédito"),
//   new FormasDePago("TC", "Tarjeta de Débito"),
//   new FormasDePago("MP", "MercadoPago"),
// ];

console.log("Información de Formas de Pago cargada correctamente.");

/*  ************************* USUARIOS *************************** */
// let admin = new Usuario(
//   "admin",
//   "admin",
//   null,
//   "admin@localhost",
//   "admin",
//   null,
//   null,
//   true
// );
// usuarios.push(admin);

// if (process.env.NODE_ENV !== "production") {
//   let user1 = new Usuario(
//     "felipemoralesquerol",
//     "Felipe",
//     "Morales",
//     "felipe.morales.querol@gmail.com",
//     "felipe1234",
//     "221123456",
//     "Calle 506 #1617"
//   );
//   let user2 = new Usuario(
//     "juanperez",
//     "Juan",
//     "Perez",
//     "juanperez@gmail.com",
//     "juan1234"
//   );

//   usuarios.push(user1);
//   usuarios.push(user2);
// }
// console.log("Información de Usuarios cargada correctamente.", usuarios);

/*  ************************* PRODUCTOS *************************** */
// if (process.env.NODE_ENV !== "production") {
//   hamburguesa1 = new Producto(
//     "HB1",
//     "Hamburguesa Clasic",
//     "Hamburguesa clásico con JyQ",
//     "349.99",
//     "100"
//   );
//   hamburguesa2 = new Producto(
//     "HB2",
//     "Hamburguesa Verde",
//     "Hamburguesa en base a vegetales",
//     "399.99",
//     "250"
//   );
//   hamburguesa3 = new Producto(
//     "HB3",
//     "Hamburguesa Power",
//     "Hamburguesa con JyQ, tomate y cebolla",
//     "449.99",
//     "602"
//   );

//   ensaladaCesar = new Producto(
//     "EC",
//     "Ensalada César",
//     "Ensalada César",
//     "566,99",
//     "20"
//   );

//   productos = [hamburguesa1, hamburguesa2, hamburguesa3, ensaladaCesar];
// }
//console.log('Información de productos cargada correctamente.', productos)

/*  ************************* PEDIDOS *************************** */
// if (process.env.NODE_ENV !== "production") {
//   let pedido1 = new Pedido("felipemoralesquerol", "EF");
//   pedido1.addProducto(hamburguesa1);
//   pedido1.addProducto(hamburguesa2);

//   let pedido2 = new Pedido("juanperez", "EF");
//   pedido2.addProducto(hamburguesa2);

//   let pedido3 = new Pedido("juanperez", "TC");
//   pedido3.addProducto(hamburguesa1);
//   pedido3.addProducto(hamburguesa3);
//   pedido3.addProducto(ensaladaCesar);

//   // carga de algunos pedidos iniciales
//   addPedido(pedido1);
//   addPedido(pedido2);
//   addPedido(pedido3);
// }

//console.log('Información de pedidos cargada correctamente.', pedidos)

module.exports = {
  UsuariosModel,
  ProductosModel,
  PedidosModel,
  FormasDePagoModel,
};
