// let productos = [];

// class Producto {
//     constructor(codigo, nombre, descripcion, precioVenta, stock) {
//         this.codigo = codigo;
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//         this.precioVenta = precioVenta;
//         this.stock = stock;
//         this.foto = undefined;
//         this.borrado = false;
//     }

//     getStock() {
//         return this.stock;
//     }

//     setStock(stock) {
//         this.stock = stock;
//     }

//     setFoto(foto) {
//         this.foto = foto;
//     }
//     getFoto() {
//         return this.foto;
//     }

//     // registra la venta de 1 unidad
//     vender() {
//         if (this.stock >= 1) {
//             this.stock -= 1;
//             return true // ok para vender, ya que tengo stock
//         } else {
//             return false; // no hay stock para vender
//         }
//     }

// }

// module.exports = { productos, Producto }

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
    modelName: "productos",
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    await ProductosModel.sync({ force: false });
    let dato = await ProductosModel.findOrCreate({
      where: {
        codigo: "HB1",
        nombre: "Hamburguesa Clasic",
        descripcion: "Hamburguesa clásico con JyQ",
        precioVenta: "500",
        stock: 100,
      },
    });

    dato = await ProductosModel.findOrCreate({
      where: {
        codigo: "HB2",
        nombre: "Hamburguesa Verde",
        descripcion: "Hamburguesa en base a vegetales",
        precioVenta: "450",
        stock: 200,
      },
    });

    dato = await ProductosModel.findOrCreate({
      where: {
        codigo: "EC",
        nombre: "Ensalada Cesar",
        descripcion: "Ensalada Cesar",
        precioVenta: "350",
        stock: 50,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

agregarDefaultData();

module.exports = ProductosModel;
