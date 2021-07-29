// carga de información adicional
let usuarios = require('./usuarios');
let productos = require('./productos');
// todo: pasaje a class
let pedidosNumerador = 0;
let pedidos = [];

addPedido = (pedido) => {
    pedidosNumerador += 1;
    pedido.setNumero(pedidosNumerador);
    pedidos.push(pedido);
}




class Pedido {
    constructor(usuario, formaDePago) {
        // asignación de numero de pedido
        //pedidos.length == 0 ? this.numero = 1 : this.numero = pedidos[pedidos.length - 1] + 1;
        this.usuario = usuario;
        this.direccionEnvio = 'Tomar del usuario para registro histórico';
        // EF:Efectivo, TC:Tarjeta de Crédito, TD:Tarjeta de Débito, MP:MercadoPago
        this.formaDePago = formaDePago;
        this.fechaHora = new Date();
        // Pendiente => Confirmado => En preparación => Enviado => Entregado
        this.estado = 'Pendiente';
        this.montoTotal = 0;
        this.productos = [];
    }

    setNumero(numero) {
        this.numero = numero;   
    };

    addProducto(producto){
        this.montoTotal += producto.precioVenta;
        this.productos.push(producto);
    }


}


module.exports = { pedidos, Pedido }