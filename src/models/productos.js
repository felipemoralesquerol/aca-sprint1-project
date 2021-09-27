let productos = [];

class Producto {
    constructor(codigo, nombre, descripcion, precioVenta, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioVenta = precioVenta;
        this.stock = stock;
        this.foto = undefined;
        this.borrado = false;
    }

    getStock() {
        return this.stock;
    }

    setStock(stock) {
        this.stock = stock;
    }

    setFoto(foto) {
        this.foto = foto;
    }
    getFoto() {
        return this.foto;
    }

    // registra la venta de 1 unidad
    vender() {
        if (this.stock >= 1) {
            this.stock -= 1;
            return true // ok para vender, ya que tengo stock
        } else {
            return false; // no hay stock para vender
        }
    }

}



module.exports = { productos, Producto }