## Curso de Desarrollo Web Backend Acámica. Revisión 4

#### Descripción del proyecto

Sprint Project N. 1 en el marco del Curso de Desarrollo Web Backend de Acámica 2021 (Jun/Oct)!
Adaptaciones para soporte de Sprint Project N. 2

#### Prerrequisitos tecnológicos:

- git (control de código fuente)
- Node.Js (server backend)
- MySQL Server Database (database)
- Redis Server (cache server)


#### Entidades gestionadas:

- Usuarios
- Pedidos
- Formas de Pago
- Productos
- Direcciones (usuarios)


#### Módulos de Node.Js utilizados:

- "bcrypt": "^5.0.1",
- "chai": "^4.3.4",
- "dotenv": "^10.0.0",
- "express": "^4.17.1",
- "express-validator": "^6.12.2",
- "helmet": "^4.6.0",
- "jsonwebtoken": "^8.5.1",
- "mocha": "^9.1.2",
- "mongoose": "^6.0.8",
- "morgan": "^1.10.0",
- "mysql2": "^2.3.0",
- "node-fetch": "^2.6.3",
- "nodemon": "^2.0.13",
- "require-from-url": "^3.1.3",
- "sequelize": "^6.6.5",
- "swagger-jsdoc": "^6.1.0",
- "swagger-ui-express": "^4.1.6"


#### Instrucciones de instalación:

1. Crear carpeta para su instalación.
2. Ingresar a la carpeta creada y desde la consola ejecutar:
   `git clone https://github.com/felipemoralesquerol/aca-sprint1-project`
3. Ingresar a la carpeta aca-sprint1-project.
4. Ejecutar `npm install`.
5. Copiar el archivo .env.example a .env
6. Configurar las variables de entorno del archivo .env a su configuración
7. (opcional) Ejecutar script sql ubicado en carpeta sql que contiene las sentencias de creación de base de datos y tablas.
8. Chequear las dependencias utilizadas vía `npm-check`
9. Arrancar el servidor ejecutando `npm run dev`
10. Ejecución de test ejecutando `npm run test`
11. A disfrutar!!


#### Documentación de la aplicación con SWAGGER:

- Ingresa a la URL http://localhost:5000/api-docs

---

_Nota del autor:
Esta implementación fue desarrollada a titulo personal y solamente a los efectos de contar con una alternativa de la posible implementación de lo requerido.
Cualquier comentario será bienvenido!_
