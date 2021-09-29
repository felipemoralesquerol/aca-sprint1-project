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
    "./api/routes/program.js",
    "./api/routes/auth.js",
    "./api/routes/usuario.js",
    "./api/app.js",
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

// const {
//   existeUsuario,
//   isLoginUsuario,
//   isLoginUsuarioAuth,
//   isAdmin,
//   nuevoUsuario,
// } = require("./middleware");

// Inicializacion del server
const app = express();

const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(morgan("dev"));

const program = require("./routes/program.js");
app.use("/", program);

// Importación de rutas
const authRoutes = require("./routes/auth");
const usuarioRoutes = require("./routes/usuario");
const productoRoutes = require("./routes/producto");
const pedidoRoutes = require("./routes/pedido");
const formasDePagoRoutes = require("./routes/formasDePago");

app.use(authRoutes);
app.use(usuarioRoutes);
app.use(productoRoutes);
app.use(pedidoRoutes);
app.use(formasDePagoRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
});
