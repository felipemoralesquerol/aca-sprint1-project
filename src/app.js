const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const db = require("../config/db");

//Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    //servers: ["http://localhost:5000/"],
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "API Resto",
      version: "1.0.0",
      description: "Sprint Project N. 1",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/program.js",
    "./src/routes/auth.js",
    "./src/routes/usuario.js",
    "./src/app.js",
  ],
  tags: [
    {
      name: "general",
      description: "Operaciones generales",
    },
    {
      name: "auth",
      description: "Operaciones sobre autorización",
    },
    {
      name: "usuarios",
      description: "Operaciones sobre usuarios",
    },
    {
      name: "pedidos",
      description: "Operaciones sobre pedidos",
    },
    {
      name: "productos",
      description: "Operaciones sobre productos",
    },
    {
      name: "formas de pago",
      description: "Operaciones sobre formas de pago",
    },
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Importacion de archivos particulares

//const { usuarios } = require('./infoUsuarios');
let {
  usuarios,
  Usuario,
  productos,
  Producto,
  pedidos,
  Pedido,
  pedidosEstado,
  formasDePago,
  FormasDePago,
} = require("./models/init");

const {
  existeUsuario,
  isLoginUsuario,
  isLoginUsuarioAuth,
  isAdmin,
  nuevoUsuario,
} = require("./middleware");

const program = require("./routes/program.js");

// Inicializacion del server
const app = express();

const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(morgan("dev"));

app.use("/", program);

// Importación de rutas
const auth = require("./routes/auth");
const usuario = require("./routes/usuario");

app.use(auth);
app.use(usuario);

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
 *    tags: [productos]
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
app.get("/productos", isLoginUsuario, function (req, res) {
  console.log(productos);
  res.send(productos);
});

/**
 * @swagger
 * /productos:
 *  post:
 *    tags: [productos]
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
app.post("/productos", isLoginUsuario, isAdmin, function (req, res) {
  let producto = req.body;
  console.log(producto);
  productos.push(producto);
  res.send(producto);
});

/**
 * @swagger
 * /productos/{codeProducto}:
 *  put:
 *    tags: [productos]
 *    summary: productos.
 *    description : Actualización de datos de producto.
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
 *        name: codeProducto
 *        required: true
 *        description: Código de producto a actualizar.
 *        schema:
 *          type: string
 *          example: XX
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
 *            borrado:
 *              description: Borrado
 *              type: boolean
 *              example: false
 *    responses:
 *      201:
 *       description: Producto actualizado
 *      401:
 *       description: Producto no actualizado
 *
 */
app.put(
  "/productos/:codeProducto",
  isLoginUsuario,
  isAdmin,
  function (req, res) {
    let productoActualizado = req.body;
    console.log(productoActualizado);
    let index = productos.findIndex(
      (elemento) =>
        elemento.codigo == productoActualizado.codigo &&
        elemento.codigo == req.params.codeProducto
    );
    if (index === -1) {
      return res
        .status(404)
        .send({ resultado: "Producto no encontrado o código incorrecto" });
    }
    productos[index] = productoActualizado;
    res.send({
      resultado: "Producto actualizado: " + productoActualizado.codigo,
    });
  }
);

/**
 * @swagger
 * /productos/{codeProducto}:
 *  delete:
 *    tags: [productos]
 *    summary: Eliminar un producto.
 *    description: Elimina un producto según un codigo de producto.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: codeProducto
 *         required: true
 *         description: Código de producto a borrar.
 *         schema:
 *           type: string
 *           example: XX
 *    responses:
 *       200:
 *        description: producto eliminado correctamente.
 *       404:
 *        description: producto no encontrado.
 */

app.delete(
  "/productos/:codeProducto",
  isLoginUsuario,
  isAdmin,
  function (req, res) {
    //TODO: Modularizar
    let codeABorrar = req.params.codeProducto;
    // Recuperación de datos del producto a borrar
    productoABorrar = productos.find(
      (elemento) => elemento.codigo == codeABorrar
    );
    console.log(productoABorrar);
    if (!productoABorrar) {
      return res
        .status(404)
        .json({ resultado: `Producto a borrar no encontrado` });
    }
    resultado = "Borrado según el indice: " + productoABorrar;
    productoABorrar.borrado = true;
    return res.json({ resultado: resultado, valor: productoABorrar });
  }
);

/*PEDIDOS**********************************************************************************************/
/**
 * @swagger
 * /pedidos:
 *  get:
 *    tags: [pedidos]
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
app.get("/pedidos", isLoginUsuario, function (req, res) {
  pedidosUsuario = pedidos.filter(
    (p) => req.usuario.admin || p.usuario == req.usuario.username
  );
  console.log(pedidosUsuario);
  res.send(pedidosUsuario);
});

/**
 * @swagger
 * /pedidos:
 *  post:
 *    tags: [pedidos]
 *    summary: Agregado de pedido.
 *    description : Agregado de pedido.
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
 *        name: pedido
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - formaDePago
 *          properties:
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example:
 *            formaDePago:
 *              description: Forma de Pago (EF, TC, TD, MP)
 *              type: string
 *              example: EF
 *    responses:
 *      201:
 *       description: Pedido creado
 *      401:
 *       description: Pedido no creado
 *
 */
app.post("/pedidos", isLoginUsuario, function (req, res) {
  let { direccionEnvio, formaDePago } = req.body;
  usuario = req.usuario;
  console.log(req.body);
  if (!formaDePago in ["EF", "TC", "TD", "MP"]) {
    return res
      .status(404)
      .send({ resultado: `Forma de pago incorrecta: ${formaDePago}` });
  }
  direccionEnvio = direccionEnvio || usuario.direccionEnvio;
  pedido = new Pedido(usuario.username, formaDePago);
  pedido.setDireccionEnvio(direccionEnvio);
  //Agregado de pedido a la lista global de pedidos
  addPedido(pedido);
  console.log(pedidos);
  res.send(pedido);
});

/**
 * @swagger
 * /pedidos/{id}:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificación de pedido.
 *    description : Modificación de pedido.
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
 *        description: ID del pedido a modificar
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: pedido
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - formaDePago
 *          properties:
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: "Calle x"
 *            formaDePago:
 *              description: Forma de Pago (EF, TC, TD, MP)
 *              type: string
 *              example: EF
 *    responses:
 *      201:
 *       description: Pedido modificado
 *      401:
 *       description: Pedido no modificado debido a error
 *
 */
app.put("/pedidos/:id", isLoginUsuario, function (req, res) {
  idPedido = req.params.id;
  let { direccionEnvio, formaDePago } = req.body;
  usuario = req.usuario;
  console.log(req.body);
  if (!formaDePago in ["EF", "TC", "TD", "MP"]) {
    return res
      .status(404)
      .send({ resultado: `Forma de pago incorrecta: ${formaDePago}` });
  }

  pedido = pedidos.find(
    (p) => p.id == idPedido && p.usuario == req.usuario.username
  );
  if (!pedido) {
    return res
      .status(404)
      .send({ resultado: `ID de pedido no encontrado: ${idPedido}` });
  }
  //Requerimiento adicional (s). Los usuarios solo pueden agregar productos si el pedido está PEN
  if (pedido.estado != "PEN") {
    return res.status(404).send({
      resultado: `Un usuario solo puede modificar un pedido en estado pendiente`,
    });
  }
  direccionEnvio = direccionEnvio || usuario.direccionEnvio;
  pedido.setFormaDePago(formaDePago);
  pedido.setDireccionEnvio(direccionEnvio);
  console.log(pedidos);
  res.send(pedido);
});

/**
 * @swagger
 * /pedidos/{id}:
 *  get:
 *    tags: [pedidos]
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
app.get("/pedidos/:id", isLoginUsuario, function (req, res) {
  idPedido = req.params.id;
  console.log(req.params, req.query.index);
  pedidosUsuario = pedidos.find(
    (p) =>
      p.id == idPedido &&
      (req.usuario.admin || p.usuario == req.usuario.username)
  );
  console.log(idPedido, pedidosUsuario);
  if (!pedidosUsuario) {
    res.status(404).json({ message: "Orden no encontrada" });
  } else {
    res.send(pedidosUsuario);
  }
});

/**
 * @swagger
 * /pedidos/{id}/producto/{codeProducto}:
 *  post:
 *    tags: [pedidos]
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
app.post(
  "/pedidos/:id/producto/:codeProducto",
  isLoginUsuario,
  function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index, req.body);
    pedidoUsuario = pedidos.find(
      (p) =>
        p.id == idPedido &&
        (req.usuario.admin || p.usuario == req.usuario.username)
    );
    if (!pedidoUsuario) {
      return res.status(404).send({ resultado: `Id Pedido no encontrado` });
    }
    //Requerimiento adicional (s). Los usuarios solo pueden agregar productos si el pedido está PEN
    if (!req.usuario.admin && pedidoUsuario.estado != "PEN") {
      return res.status(404).send({
        resultado: `Un usuario solo puede agregar productos a pedidos en estado pendiente`,
      });
    }
    codeProducto = req.body.codeProducto;
    producto = productos.find((p) => p.codigo == codeProducto && !p.borrado);
    if (!producto) {
      return res
        .status(404)
        .send({ resultado: `Código de producto no encontrado o inhabilitado` });
    }
    console.log(codeProducto, producto);
    pedidoUsuario.addProducto(producto);
    console.log(pedidoUsuario);
    res.send({
      resultado:
        "Producto agregado correctamente. El pedido sale: " +
        pedidoUsuario.montoTotal,
    });
  }
);

/**
 * @swagger
 * /pedidos/{id}/estado/{codeEstado}:
 *  patch:
 *    tags: [pedidos]
 *    summary: Cambio de estado
 *    description: Cambio de estado de pedido vía id pedido
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
 *        name: codeEstado
 *        description: Código del estado a cambiar
 *        schema:
 *          type: object
 *          required:
 *            - codeEstado
 *          properties:
 *            codeEstado:
 *              description: Código de Estado (PEN, CON, ENP, ENV, ENT)
 *              type: string
 *              example: XX
 *    responses:
 *      200:
 *        description: Ok de producto agregado
 */
app.patch(
  "/pedidos/:id/estado/:codeEstado",
  isLoginUsuario,
  isAdmin,
  function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index, req.body);
    pedidosUsuario = pedidos.find(
      (p) =>
        p.id == idPedido &&
        (req.usuario.admin || p.usuario == req.usuario.username)
    );
    if (!pedidosUsuario) {
      return res.status(404).send({ resultado: `Id Pedido no encontrado` });
    }
    //Chequeo de Estado
    codeEstado = req.body.codeEstado;
    Estado = pedidosEstado.find((pe) => pe == codeEstado);
    if (!Estado) {
      return res
        .status(404)
        .send({ resultado: `Código de Estado no encontrado` });
    }
    console.log(codeEstado, Estado);
    pedidosUsuario.setEstado(Estado);
    console.log(pedidosUsuario);
    res.send({
      resultado:
        "Cambio de Estado. El pedido está en : " + pedidosUsuario.getEstado(),
    });
  }
);

/*FORMAS DE PAGO  ****************************************************************************************/
/**
 * @swagger
 * /formasDePago:
 *  get:
 *    tags: [formas de pago]
 *    summary: Formas de Pago
 *    description: Listado de formas de pago
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
 *         description: Listado de formas de pago
 */
app.get("/formasDePago", isLoginUsuario, function (req, res) {
  console.log(formasDePago);
  res.send(formasDePago);
});

/**
 * @swagger
 * /formasDePago:
 *  post:
 *    tags: [formas de pago]
 *    summary: Formas de Pagos.
 *    description : Agregado de formas de Pago.
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
 *        name: formaDePago
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *          properties:
 *            codigo:
 *              description: Código de la forma de pago
 *              type: string
 *              example: EF
 *            nombre:
 *              description: Nombre de la forma de pago
 *              type: string
 *              example: Efectivo
 *    responses:
 *      201:
 *       description: Forma de pago creada
 *      401:
 *       description: Forma de pago no creada
 *
 */
app.post("/formasDePago", isLoginUsuario, isAdmin, function (req, res) {
  let formaDePago = req.body;
  console.log(formaDePago);
  formaDePagoNueva = new FormasDePago(formaDePago.codigo, formasDePago.nombre);
  formasDePago.push(formaDePagoNueva);
  res.send(formaDePagoNueva);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
});
