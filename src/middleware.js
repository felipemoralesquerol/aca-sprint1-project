const { usuarios } = require("./infoUsuarios");

// Funciones de middlewares
function isLoginUsuario(req, res, next) {
    id = parseInt(req.query.index);
    console.log(req.query);
    //TODO: Por el momento solo trabajamos con el indice del usuario
    //index = usuarios.findIndex(elemento => elemento.id == id);
    index = id;
    usuario = usuarios[index];
    console.log(index);
    if (!usuario) {
        res.status(404).send({ resultado: `Usuario no logueado o inexistente` });
    } else {
        req.usuarioIndex = index;
        req.usuario = usuario;
        next();
    }
}



function isLoginUsuarioAuth(req, res, next) {
    token = req.headers['authorization'].substring(7,255);
    console.log(token);
    //Formato de auth es 'Bearer Token' (token de portador)
    token = token.substring(7)
    //TODO: Por el momento solo trabajamos con el indice del usuario
    //index = usuarios.findIndex(elemento => elemento.id == id);
    index = token;
    usuario = usuarios[index];
    console.log(index);
    if (!usuario) {
        res.status(404).send({ resultado: `Usuario no logueado o inexistente` });
    } else {
        req.usuarioIndex = index;
        req.usuario = usuario;
        next();
    }
}



function existeUsuario(req, res, next) {
    email = req.body.email;
    password = req.body.password;
    index = usuarios.findIndex(elemento => elemento.email == email && elemento.password == password);
    console.log(req.body,index);
    if (index === -1) {
        //res.status(404).send({ resultado: false, mensaje: `Usuario no logueado o inexistente` });
        res.status(404).send({resultado:false});
    } else {
        req.usuarioIndex = index;
        req.usuario = usuarios[index];
        next();
    }
}

function isAdmin(req, res, next) {
    admin = req.usuario.admin;
    if (index === -1) {
        res.status(404).send({ resultado: false, mensaje: `Acceso denegado` });
    } else {
        next();
    }
}



module.exports = { isLoginUsuario, isLoginUsuarioAuth, existeUsuario, isAdmin }