const { arrayInfo } = require("./info");

// Funciones de middlewares
function existeAutomotor(req, res, next) {
    let id = req.params.id;
    let index = arrayInfo.findIndex(auto => auto.id == id);
    let auto = arrayInfo[index];
    console.log(index);
    if (!auto) {
        res.status(404).send({ resultado: `Id auto ${id} no existe` });
    } else {
        req.index = index;
        req.auto = auto;
        next();
    }
}

module.exports = { existeAutomotor }