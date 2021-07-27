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

const { usuarios } = require('./info');
const { existeUsuario, isLoginUsuario } = require('./middleware');

// Inicializacion del server
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());


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
    res.send({ programa: "Resto v1.0.0" })
})

/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: usuarios
 *    description: Listado de usuarios
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
app.get('/usuarios', isLoginUsuario, function (req, res) {
    console.log(usuarios);
    res.send(usuarios);
});

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login de usuarios.
 *    description : Login de usuarios.
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
 *              example: 
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      404:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */
app.post('/login', existeUsuario, function (req, res) {
    console.log('Login OK: ', req.usuarioIndex);
    res.json({index: req.usuarioIndex});
})

/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: usuarios.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuarios
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            id:
 *              description: ID de usuario  a agregar
 *              type: integer
 *            marca:
 *              description: Marca del usuario 
 *              type: string
 *            modelo:
 *              description: Modelo del usuario 
 *              type: string
 *            fechaFabricacion:
 *              description: Fecha de fabricacion del usuario 
 *              type: string
 *            cantidadPuertas:
 *              description: Cantidad de puertas del usuario 
 *              type: integer
 *            disponibleVenta:
 *              description: Disponiniblidad de venta
 *              type: boolean
 *    responses:
 *      201:
 *       description: Agregado de usuario 
 *      
 */
app.post('/usuarios', function (req, res) {
    let usuario = req.body;
    console.log(req.body);
    usuarios.push(usuario);
    res.send(usuario);
});


/**
 * @swagger
 * /usuarios/{id}:
 *  get:
 *    summary: Recupera la información de un usuario  según su ID
 *    description: Información de un usuarios.
 *    parameters:
 *       - in: path
 *         name: id
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
app.get('/usuarios/:id', isLoginUsuario, function (req, res) {
    let usuario= req.usuario;
    console.log(usuario);
    res.send(usuario);
});

/**
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *    summary: Eliminar un usuario  según su ID
 *    description: Elimina el usuario .
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: usuario  eliminado correctamente.
 *       404:
 *        description: usuario  no encontrado.  
 */
app.delete('/usuarios/:id', existeUsuario, function (req, res) {
    let usuario = req.usuario
    let index = req.index
    resultado = 'Borrado según el indice: ' + index
    usuarios.splice(index, 1);
    res.send({ resultado: resultado, valor: usuario });
});



/**
 * @swagger
 * /usuarios/{id}:
 *  put:
 *    summary: Modificación de usuario  segun ID.
 *    description : Modificación de usuario  segun ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: name that need to be updated
 *        required: true
 *        type: integer
 *      - in: body
 *        name: usuarios
 *        description: usuario  a modificar
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            id:
 *              description: ID de usuario  a modificar
 *              type: integer
 *            marca:
 *              description: Marca del usuario 
 *              type: string
 *            modelo:
 *              description: Modelo del usuario 
 *              type: string
 *            fechaFabricacion:
 *              description: Fecha de fabricacion del usuario 
 *              type: string
 *            cantidadPuertas:
 *              description: Cantidad de puertas del usuario 
 *              type: integer
 *            disponibleVenta:
 *              description: Disponiniblidad de venta
 *              type: boolean
 *    responses:
 *      201:
 *       description: Agregado de usuario 
 *      
 */
app.put('/usuarios/:id', existeUsuario, function (req, res) {
    let autoNuevo = req.body;
    let index = req.index
    resultado = 'Actualización según el indice: ' + index
    arrayInfo[index] = autoNuevo;
    res.send({ resultado: resultado, valor: autoNuevo });
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});