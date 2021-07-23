const express = require('express');
const morgan = require('morgan')
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: '????',
            version: '1.0.1'
        }
    },
    apis: ['./src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Importacion de archivos particulares

const { arrayInfo } = require('./info');


// Inicializacion del server
const app = express();

app.use(express.json());
app.use(morgan('dev'));



/**
 * @swagger
 * /:
 *  get:
 *    summary: programa
 *    description : Listado de autores y sus libros
 */
app.get('/', function (req, res) {
    res.send({ programa: "Automotores" })
})

/**
 * @swagger
 * /automotores:
 *  get:
 *    summary: automotores
 *    description: Listado de automotores
 *    responses:
 *       200:
 *         description: Listado de autores
 */
app.get('/automotores', function (req, res) {
    console.log(arrayInfo);
    res.send(arrayInfo);
});

/**
 * @swagger
 * /automotores:
 *  post:
 *    summary: automotores
 *    description : Listado de automotores
 */
app.post('/automotores', function (req, res) {
    let auto = req.body;
    console.log(auto);
    arrayInfo.push(auto);
    res.send(auto);
});


/**
 * @swagger
 * /automotores/{id}:
 *  get:
 *    summary: Auto por ID
 *    description: Información de un automotores.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del auto a recuperar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: Listado ok.
 */

app.get('/automotores/:id', existeAutomotor, function (req, res) {
    let auto = req.auto;
    console.log(auto);
    res.send(auto);
});


/**
 * @swagger111
 * /autores/{id}/libros:
 *  get:
 *    summary: Libros según ID de Autor
 *    description: Devuelve los libros de un autor.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor a recuperar.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *        description: Listado de libros.
 */


app.delete('/automotores/:id', existeAuto, function (req, res) {
    let auto = req.auto
    let index = req.index
    resultado = 'Borrado según el indice: ' + index
    arrayInfo.splice(index, 1);
    res.send({ resultado: resultado, valor: auto });
});

app.put('/automotores/:id', existeAuto, function (req, res) {
    let autoNuevo = req.body;
    let index = req.index
    resultado = 'Actualización según el indice: ' + index
    arrayInfo[index] = autoNuevo;
    res.send({ resultado: resultado, valor: autoNuevo });
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs


app.listen(5000, function () {
    console.log('Escuchando el puerto 5000!');
});