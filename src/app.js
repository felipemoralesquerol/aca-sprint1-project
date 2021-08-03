const express = require('express');
const morgan = require('morgan')
const config = require('../config')
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Resto',
            version: '1.0.0'
        }
    },
    apis: ['./src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Importacion de archivos particulares

//const { usuarios } = require('./infoUsuarios');
let { usuarios, Usuario, productos, Producto, pedidos, Pedido } = require('../models/init');

const { existeUsuario, isLoginUsuario, isLoginUsuarioAuth, isAdmin, nuevoUsuario } = require('./middleware');

// Inicializacion del server
const app = express();

app.use(express.json());
app.use(morgan('dev'));


/**
 * @swagger
 * /:
 *  get:
 *    summary: programa
 *    description : Resto
 *    responses:
 *     200: 
 *       description: programa
 */
app.get('/', function (req, res) {
    res.send({ programa: "Resto v1.0.2" })
})


/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login de usuario.
 *    description : Login de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Email y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              description: Email de usuario a loguearse.
 *              type: email
 *              example: admin@localhost
 *            password:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: 1234
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      404:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */
app.post('/auth/login', existeUsuario, function (req, res) {
    console.log('Login OK: ', req.usuarioIndex);
    res.json({ index: req.usuarioIndex });
})




/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: usuarios.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *            - nombre
 *            - apellido
 *            - email
 *            - direccionEnvio
 *            - telefono
 *          properties:
 *            username:
 *              description: Nombre del usuario
 *              type: string
 *              example: juangomez
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: 1234
 *            nombre:
 *              description: Nombre del usuario 
 *              type: string
 *              example: Juan
 *            apellido:
 *              description: Apellido del usuario 
 *              type: string
 *              example: Gomez
 *            email:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: juangomez@gmail.com
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: La Plata, Calle 7 # 1234
 *            telefono:
 *              description: Telefono del usuario
 *              type: string
 *              example: 221 1234567
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *      
 */
app.post('/auth/signup', nuevoUsuario, function (req, res) {
    let { username, nombre, apellido, email, password, telefono, direccionEnvio } = req.body;
    console.log(req.body);
    usuario = new Usuario(username, nombre, apellido, email, password, telefono, direccionEnvio);

    usuarios.push(usuario);
    res.send(usuario);
});


/**
 * @swagger
 * /auth/logout:
 *  post:
 *    summary: Logout de usuario.
 *    description : Logout de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
*       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *      200:
 *       description: Logout de usuario satisfactorio. 
 *      404:
 *       description: Usuario no encontrado (id incorrecta)
 */
app.post('/auth/logout', isLoginUsuario, function (req, res) {
    console.log('Logout OK: ', req.usuarioIndex);
    res.json({ index: -1 });
})

/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: usuarios
 *    description: Listado de usuarios
 *    tag: Usuario
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
app.get('/usuarios', isLoginUsuario, isAdmin /*isLoginUsuarioAuth*/, function (req, res) {
    console.log(usuarios);
    res.send(usuarios);
});




/**
 * @swagger
 * /usuarios/{id}:
 *  get:
 *    summary: Recupera la información de un usuario  según su ID
 *    description: Información de un usuarios.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID del usuario a recuperar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: usuario  no encontrado.  
*/
app.get('/usuarios/:id', isLoginUsuario, isAdmin, function (req, res) {
    let usuario = req.usuario;
    console.log(usuario);
    res.send(usuario);
});

/**
 * @swagger
 * /usuarios/{id}/pedidos:
 *  get:
 *    summary: Recupera la información pedidos según su ID
 *    description: Información de un usuarios.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID del usuario a recuperar sus pedidos.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: Listado de pedidos ok.
 *       404:
 *        description: Usuario  no encontrado.  
*/
app.get('/usuarios/:id/pedidos', isLoginUsuario, function (req, res) {
    //TODO: Refactoring con /pedidos
    pedidosUsuario = pedidos.filter(p => req.usuario.admin || (p.usuario == req.usuario.username));
    console.log(pedidosUsuario);
    res.send(pedidosUsuario);
});




/**
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *    summary: Eliminar un usuario  según su ID
 *    description: Elimina el usuario .
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: usuario  eliminado correctamente.
 *       404:
 *        description: usuario  no encontrado.  
 */
app.delete('/usuarios/:id', isLoginUsuario, isAdmin, function (req, res) {
    //TODO: Modularizar
    let usuario = req.usuario
    let index = req.usuarioIndex
    let indexABorrar = req.params.id;
    // Recuperación de datos del usuario a borrar
    usuarioABorrar = usuarios[indexABorrar];
    console.log(indexABorrar, usuarioABorrar);
    if (!usuarioABorrar) {
        res.status(404).send({ resultado: `Usuario a borrar no encontrado` });
    }
    resultado = 'Borrado según el indice: ' + usuarioABorrar
    usuarioABorrar.borrado = true
    res.send({ resultado: resultado, valor: usuarioABorrar });
});


// TODO: Desarrollar a futuro
// /**
//  * @swagger
//  * /usuarios/{id}:
//  *  put:
//  *    summary: Modificación de usuario  segun ID.
//  *    description : Modificación de usuario  segun ID.
//  *    consumes:
//  *      - application/json
//  *    parameters:
//  *      - name: id
//  *        in: path
//  *        description: name that need to be updated
//  *        required: true
//  *        type: integer
//  *      - in: body
//  *        name: usuarios
//  *        description: usuario  a modificar
//  *        schema:
//  *          type: object
//  *          required:
//  *            - id
//  *          properties:
//  *            id:
//  *              description: ID de usuario  a modificar
//  *              type: integer
//  *            marca:
//  *              description: Marca del usuario 
//  *              type: string
//  *            modelo:
//  *              description: Modelo del usuario 
//  *              type: string
//  *            fechaFabricacion:
//  *              description: Fecha de fabricacion del usuario 
//  *              type: string
//  *            cantidadPuertas:
//  *              description: Cantidad de puertas del usuario 
//  *              type: integer
//  *            disponibleVenta:
//  *              description: Disponiniblidad de venta
//  *              type: boolean
//  *    responses:
//  *      201:
//  *       description: Agregado de usuario 
//  *      
//  */
// app.put('/usuarios/:id', existeUsuario, function (req, res) {
//     let autoNuevo = req.body;
//     let index = req.index
//     resultado = 'Actualización según el indice: ' + index
//     arrayInfo[index] = autoNuevo;
//     res.send({ resultado: resultado, valor: autoNuevo });
// });


/*PRODUCTOS*****************************************************************************************/
/**
 * @swagger
 * /productos:
 *  get:
 *    summary: productos
 *    description: Listado de productos 
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
app.get('/productos', isLoginUsuario, function (req, res) {
    console.log(productos);
    res.send(productos);
});





/**
 * @swagger
 * /productos:
 *  post:
 *    summary: productos.
 *    description : Agregado de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1 
 *      - in: body
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precioVenta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *            nombre:
 *              description: Nombre del producto 
 *              type: string
 *              example: Ensalada Verde
 *            descripcion:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Ensalada verde en base a vegetales
 *            precioVenta:
 *              description: Precio de venta del producto 
 *              type: float
 *              example: 100
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1000
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *      
 */
app.post('/productos', isLoginUsuario, isAdmin, function (req, res) {
    let producto = req.body;
    console.log(producto);
    productos.push(producto);
    res.send(producto);
});




/*PEDIDOS**********************************************************************************************/
/**
 * @swagger
 * /pedidos:
 *  get:
 *    summary: pedidos
 *    description: Listado de pedidos 
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
app.get('/pedidos', isLoginUsuario, function (req, res) {
    pedidosUsuario = pedidos.filter(p => req.usuario.admin || (p.usuario == req.usuario.username));
    console.log(pedidosUsuario);
    res.send(pedidosUsuario);
});

/**
 * @swagger
 * /pedidos/{id}:
 *  get:
 *    summary: pedidos según id pedido
 *    description: Listado de pedidos 
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a mostrar
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
app.get('/pedidos/:id', isLoginUsuario, function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index);
    pedidosUsuario = pedidos.find(p => (p.id == idPedido && (req.usuario.admin || (p.usuario == req.usuario.username))));
    console.log(idPedido, pedidosUsuario);
    res.send(pedidosUsuario);
});


/**
 * @swagger
 * /pedidos/{id}/producto/{codeProducto}:
 *  post:
 *    summary: pedidos según id pedido
 *    description: Listado de pedidos 
 *    consumes:
 *      - application/json
 *    parameters:   
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a mostrar
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: producto
 *        description: Código del producto a agregar al pedido
 *        schema:
 *          type: object
 *          required:
 *            - codeProducto
 *          properties:
 *            codeProducto:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *    responses:
 *      200:
 *        description: Ok de producto agregado
 */
 app.post('/pedidos/:id/producto/:codeProducto', isLoginUsuario, function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index, req.body);
    pedidosUsuario = pedidos.find(p => (p.id == idPedido && (req.usuario.admin || (p.usuario == req.usuario.username))));
    if (!pedidosUsuario){
        res.status(404).send({ resultado: `Id Pedido no encontrado`})
    }
    codeProducto = req.body.codeProducto;
    producto = productos.find(p => p.codigo == codeProducto)
    if (!producto) {
        res.status(404).send({ resultado: `Código de producto no encontrado`})
    }
    console.log(codeProducto, producto);
    pedidosUsuario.addProducto(producto);
    console.log(pedidosUsuario);
    res.send('Producto agregado correctamente. El pedido sale: ' + pedidosUsuario.montoTotal);
});




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});