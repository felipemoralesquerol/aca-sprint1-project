let usuarios = [];

class Usuario {
    constructor(username, nombre, apellido, email, password, telefono, direccionEnvio, admin) {
        this.username = username;
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

let admin = new Usuario('admin', 'admin', null, 'admin@localhost', 'admin', null, null, true);
let user1 = new Usuario('felipemoralesquerol', 'felipe', 'morales', 'felipe.morales.querol@gmail.com','feli1234')


usuarios = [admin, user1];
console.log('Información cargada correctamente.', usuarios)

module.exports = { usuarios }