const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos satisfactoriamente.');
    } catch (error) {
        console.error('Se ha detectado un error al conectarse a la base de datos:', error);
    }
};

authenticate();

