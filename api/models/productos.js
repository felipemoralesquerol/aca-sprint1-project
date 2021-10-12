const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class ProductosModel extends Model {}

ProductosModel.init(
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precioVenta: {
      type: DataTypes.DECIMAL,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    foto: {
      type: DataTypes.STRING,
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'producto',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);


module.exports = ProductosModel;
