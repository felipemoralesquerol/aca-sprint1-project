const { arrayInfo } = require("./info");

// Funciones de middlewares
function existeAutomotor(req, res, next) {
    id = req.params.id;
    console.log(id);
    index = arrayInfo.findIndex(auto => auto.id == id);
    auto = arrayInfo[index];
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