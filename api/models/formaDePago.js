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
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "formas_de_pago",
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    await FormasDePagoModel.sync({ force: false });
    let dato = await FormasDePagoModel.findOrCreate({
      where: { codigo: "EF", nombre: "Efectivo" },
    });

    dato = await FormasDePagoModel.findOrCreate({
      where: {
        codigo: "TD",
        nombre: "Tarjeta de Débito",
      },
    });
    dato = await FormasDePagoModel.findOrCreate({
      where: {
        codigo: "TC",
        nombre: "Tarjeta de Crédito",
      },
    });

    dato = await FormasDePagoModel.findOrCreate({
      where: {
        codigo: "MP",
        nombre: "Mercado Pago",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = FormasDePagoModel;
