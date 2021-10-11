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

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    //await ProductosModel.sync({ force: false });

    // let dato = await ProductosModel.findOrCreate({
    //   where: {
    //     codigo: "HB1",
    //     nombre: "Hamburguesa Clasic",
    //     descripcion: "Hamburguesa clásico con JyQ",
    //     precioVenta: "500",
    //     stock: 100,
    //   },
    // });

    // dato = await ProductosModel.findOrCreate({
    //   where: {
    //     codigo: "HB2",
    //     nombre: "Hamburguesa Verde",
    //     descripcion: "Hamburguesa en base a vegetales",
    //     precioVenta: "450",
    //     stock: 200,
    //   },
    // });

    // dato = await ProductosModel.findOrCreate({
    //   where: {
    //     codigo: "EC",
    //     nombre: "Ensalada Cesar",
    //     descripcion: "Ensalada Cesar",
    //     precioVenta: "350",
    //     stock: 50,
    //   },
    // });

    // Agregado masivo para pruebas de productos.
    // try {
    //   for (let index = 0; index < 1000; index++) {
    //     dato = await ProductosModel.findOrCreate({
    //       where: {
    //         codigo: "PT" + index,
    //         nombre: "Producto de prueba " + index,
    //         descripcion: "Producto de prueba",
    //         precioVenta: 15 * index,
    //         stock: index,
    //       },
    //     });
    //   }
    // } catch (error) {};

  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = ProductosModel;
