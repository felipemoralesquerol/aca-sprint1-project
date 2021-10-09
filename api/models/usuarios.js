// let usuarios = [];

// class Usuario {
//     constructor(username, nombre, apellido, email, password, telefono, direccionEnvio, admin) {
//         this.username = username;
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.email = email;
//         this.password = password;
//         this.telefono = telefono;
//         this.direccionEnvio = direccionEnvio;
//         //Si no viene el parametro admin se asume falso (no administrador)
//         this.admin = admin === undefined ? false : admin;
//         this.borrado = false;
//     }

// }

// module.exports = { usuarios, Usuario }

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const passwordManager = require("../helpers/passwordManager");

class UsuariosModel extends Model {}

UsuariosModel.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    direccionEnvio: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    suspendido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "usuarios",
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    await UsuariosModel.sync({ force: false });

    let dato = await UsuariosModel.findOrCreate({
      where: {
        username: "admin",
        nombre: "admin",
        email: "admin@example.com",
        admin: true,
        password: passwordManager.encrypt("pass1234"),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = UsuariosModel;
