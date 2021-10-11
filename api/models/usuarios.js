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
    modelName: 'usuario',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    //await UsuariosModel.sync({ force: true });

    // let dato = await UsuariosModel.findOrCreate({
    //   where: {
    //     username: "admin",
    //     nombre: "admin",
    //     email: "admin@example.com",
    //     admin: true,
    //     password: passwordManager.encrypt("pass1234"),
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = UsuariosModel;
