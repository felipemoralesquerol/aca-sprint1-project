// carga de información adicional
let {usuarios, Usuario} = require('./usuarios');
let {productos, Producto} = require('./productos');
let {pedidos, Pedido} = require('./pedidos');


/*  ************************* USUARIOS *************************** */
let admin = new Usuario('admin', 'admin', null, 'admin@localhost', 'admin', null, null, true);
let user1 = new Usuario('felipemoralesquerol', 'Felipe', 'Morales', 'felipe.morales.querol@gmail.com','felipe1234')
let user2 = new Usuario('juanperez', 'Juan', 'Perez', 'juanperez@gmail.com','juan1234')

usuarios = [admin, user1, user2];
console.log('Información cargada correctamente.', usuarios)


/*  ************************* PRODUCTOS *************************** */
let hamburguesa1 = new Producto('HB1', 'Hamburguesa Clasic', 'Hamburguesa clásico con JyQ', '349.99', '100');
let hamburguesa2 = new Producto('HB2', 'Hamburguesa Verde', 'Hamburguesa en base a vegetales', '399.99', '250');
let hamburguesa3 = new Producto('HB3', 'Hamburguesa Power', 'Hamburguesa con JyQ, tomate y cebolla', '449.99', '602');

let ensaladaCesar = new Producto('EC', 'Ensalada César', 'Ensalada César', '566,99', '20');

productos = [hamburguesa1, hamburguesa2, hamburguesa3, ensaladaCesar];
console.log('Información de productos cargada correctamente.', productos)

/*  ************************* PEDIDOS *************************** */
let pedido1 = new Pedido('felipemoralesquerol', 'EF');
pedido1.addProducto(hamburguesa1);
pedido1.addProducto(hamburguesa2);


let pedido2 = new Pedido('juanperez', 'EF');
pedido2.addProducto(hamburguesa2);

let pedido3 = new Pedido('juanperez', 'TC');
pedido3.addProducto(hamburguesa1);
pedido3.addProducto(hamburguesa3);
pedido3.addProducto(ensaladaCesar);



// carga de algunos pedidos iniciales
addPedido(pedido1);

addPedido(pedido2);
addPedido(pedido3);

console.log('Información de pedidos cargada correctamente.', pedidos)

module.exports = {usuarios, Usuario, productos, Producto, pedidos, Pedido}