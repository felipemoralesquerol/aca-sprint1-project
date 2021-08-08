// carga de información adicional
let usuarios = require('./usuarios');
let productos = require('./productos');
// todo: pasaje a class
let pedidosId = 0;
let pedidos = [];
// Estados: Denotan PENdiente, CONfirmado, EN Preparación, ENViado, ENTregado
let pedidosEstado = ['PEN', 'CON', 'ENP', 'ENV', 'ENT'];


addPedido = (pedido) => {
    pedidosId += 1;
    pedido.setNumero(pedidosId);
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
        // PEN => CON => ENP => ENV => ENT
        this.estado = 'PEN';
        this.montoTotal = 0;
        this.productos = [];
    }

    setNumero(id) {
        this.id = id;
    };

    addProducto(producto) {
        this.montoTotal += parseFloat(producto.precioVenta);
        this.productos.push(producto);
    }

    setEstado(estado) {
        this.estado = estado;
    }

    getEstado() {
        return this.estado;
    }
    
    setDireccionEnvio(direccionEnvio) {
        this.direccionEnvio = direccionEnvio;
    }

    getFormaDePago(){
       return this.formaDePago;
    }

    setFormaDePago(formaDePago) {
        this.formaDePago = formaDePago;
    }
}


module.exports = { pedidos, pedidosEstado, Pedido }