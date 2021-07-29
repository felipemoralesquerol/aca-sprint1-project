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



module.exports = { usuarios, Usuario }