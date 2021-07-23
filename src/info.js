class Automotores {
    constructor(id, marca, modelo, fechaFabricacion, cantidadPuertas, disponibleVenta) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.fechaFabricacion = fechaFabricacion;
        this.cantidadPuertas = cantidadPuertas;
        this.disponibleVenta = disponibleVenta;
    }

}

let autito1 = new Automotores(1, 'honda', 'fit', '01/01/2020', 4, true );
let autito2 = new Automotores(2, 'ford', 'fiesta', '02/02/2020', 4, false)


let arrayInfo = [autito1, autito2];
console.log('Información de automotores cargada.')

module.exports = { arrayInfo }