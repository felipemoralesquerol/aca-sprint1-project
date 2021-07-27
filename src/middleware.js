const { usuarios } = require("./info");

// Funciones de middlewares
function existeUsuario(req, res, next) {
    id = req.params.id;
    console.log(id);
    //TODO: Por el momento solo trabajamos con el indice del usuario
    //index = usuarios.findIndex(elemento => elemento.id == id);
    index = id;
    usuario = usuarios[index];
    console.log(index);
    if (!usuario) {
        res.status(404).send({ resultado: `Usuario ${id} no existe` });
    } else {
        req.index = index;
        req.usuario = usuario;
        next();
    }
}

module.exports = { existeUsuario }