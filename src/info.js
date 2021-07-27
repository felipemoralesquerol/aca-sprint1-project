let usuarios = [];

class Usuario {
    constructor(nombre, apellido, email, password, telefono, direccionEnvio, admin) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccionEnvio = direccionEnvio;
        //Si no viene el parametro admin se asume falso (no administrador)
        this.admin = admin === undefined ? false : admin;
    }

}

let admin = new Usuario('admin', null, 'admin@localhost', 'admin', null, null,true);
let user1 = new Usuario('felipe', 'morales', 'feli1234', 'felipe.morales.querol@gmail.com',null)


usuarios = [admin, user1];
console.log('Información cargada correctamente.')

module.exports = { usuarios }