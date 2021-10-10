// // carga de información adicional
// let usuarios = require('./usuarios');
// let productos = require('./productos');
// // todo: pasaje a class
// let pedidosId = 0;
// let pedidos = [];
// // Estados: Denotan PENdiente, CONfirmado, EN Preparación, ENViado, ENTregado
// let pedidosEstado = ['PEN', 'CON', 'ENP', 'ENV', 'ENT'];

// addPedido = (pedido) => {
//     pedidosId += 1;
//     pedido.setNumero(pedidosId);
//     pedidos.push(pedido);
// }

// class Pedido {
//     constructor(usuario, formaDePago) {
//         // asignación de numero de pedido
//         //pedidos.length == 0 ? this.numero = 1 : this.numero = pedidos[pedidos.length - 1] + 1;
//         this.usuario = usuario;
//         this.direccionEnvio = 'Tomar del usuario para registro histórico';
//         // EF:Efectivo, TC:Tarjeta de Crédito, TD:Tarjeta de Débito, MP:MercadoPago
//         this.formaDePago = formaDePago;
//         this.fechaHora = new Date();
//         // Pendiente => Confirmado => En preparación => Enviado => Entregado
//         //
//         this.estado = 'PEN';
//         this.montoTotal = 0;
//         this.productos = [];
//     }

//     setNumero(id) {
//         this.id = id;
//     };

//     addProducto(producto) {
//         this.montoTotal += parseFloat(producto.precioVenta);
//         this.productos.push(producto);
//     }

//     setEstado(estado) {
//         this.estado = estado;
//     }

//     getEstado() {
//         return this.estado;
//     }

//     setDireccionEnvio(direccionEnvio) {
//         this.direccionEnvio = direccionEnvio;
//     }

//     getFormaDePago(){
//        return this.formaDePago;
//     }

//     setFormaDePago(formaDePago) {
//         this.formaDePago = formaDePago;
//     }
// }

// module.exports = { pedidos, pedidosEstado, Pedido }

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class PedidosModel extends Model {}

PedidosModel.init(
  {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    direccion: {
      type: DataTypes.STRING,
      comment: "Registra la dirección del usuario al momento del pedido",
    },
    estado: {
      type: DataTypes.STRING,
      comments:
        "Pendiente => Confirmado => En preparación => Enviado => Entregado. PEN => CON => ENP => ENV => ENT",
    },
    montoTotal: {
      type: DataTypes.DECIMAL,
    },
    anulado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "pedidos",
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

// TODO: Usar sequelize-cli
async function agregarDefaultData() {
  try {
    await PedidosModel.sync({ force: false });
    // let dato = await PedidosModel.findOrCreate({
    //   where: {
    //     codigo: "HB1",
    //     nombre: "Hamburguesa Clasic",
    //     descripcion: "Hamburguesa clásico con JyQ",
    //     precioVenta: "500",
    //     stock: 100,
    //   },
    // });
    // dato = await PedidosModel.findOrCreate({
    //   where: {
    //     codigo: "HB2",
    //     nombre: "Hamburguesa Verde",
    //     descripcion: "Hamburguesa en base a vegetales",
    //     precioVenta: "450",
    //     stock: 200,
    //   },
    // });
    // dato = await PedidosModel.findOrCreate({
    //   where: {
    //     codigo: "EC",
    //     nombre: "Ensalada Cesar",
    //     descripcion: "Ensalada Cesar",
    //     precioVenta: "350",
    //     stock: 50,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}

// TODO: Agregar pediodos de ejemplo para facilitar pruebas
agregarDefaultData();

module.exports = PedidosModel;
