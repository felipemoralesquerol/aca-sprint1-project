const usuarios = [];

class Usuario {
    constructor(nombre, apellido, email, password, telefono, direccionEnvio, admin = false) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccionEnvio = direccionEnvio;

        this.admin = admin;
    }

}

let admin = new Usuario('admin', null, 'admin@localhost', null, null, true);
let user1 = new Usuario('felipe', 'morales', 'feli1234', 'felipe.morales.querol@gmail.com',null)


usuarios = [admin, user1];
console.log('Información cargada correctamente.')

module.exports = { usuarios }