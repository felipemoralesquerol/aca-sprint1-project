const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class FormasDePagoModel extends Model {}

FormasDePagoModel.init(
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 250],
          msg: "El nombre de la forma de pago de tener entre 3 y 250 caracteres",
        },
        //isAlpha: true,
      },
    },

    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'formas_de_pago',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    //await FormasDePagoModel.sync({ force: true });

    // let dato = await FormasDePagoModel.findOrCreate({
    //   where: { codigo: "EF", nombre: "Efectivo" },
    // });

    // dato = await FormasDePagoModel.findOrCreate({
    //   where: {
    //     codigo: "TD",
    //     nombre: "Tarjeta de Débito",
    //   },
    // });
    // dato = await FormasDePagoModel.findOrCreate({
    //   where: {
    //     codigo: "TC",
    //     nombre: "Tarjeta de Crédito",
    //   },
    // });

    // dato = await FormasDePagoModel.findOrCreate({
    //   where: {
    //     codigo: "MP",
    //     nombre: "Mercado Pago",
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = FormasDePagoModel;
