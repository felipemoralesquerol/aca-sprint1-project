const express = require("express");
let router = express.Router();

let { formasDePago } = require("../models/init");

const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/formasDePago:
 *  get:
 *    tags: [formas de pago]
 *    summary: Formas de Pago
 *    description: Listado de formas de pago
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de formas de pago
 */
router.get(
  "/api/formasDePago",
  authController.authenticated,
  function (req, res) {
    console.log(formasDePago);
    res.send(formasDePago);
  }
);

/**
 * @swagger
 * /api/formasDePago:
 *  post:
 *    tags: [formas de pago]
 *    summary: Formas de Pagos.
 *    description : Agregado de formas de Pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: formaDePago
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *          properties:
 *            codigo:
 *              description: Código de la forma de pago
 *              type: string
 *              example: EF
 *            nombre:
 *              description: Nombre de la forma de pago
 *              type: string
 *              example: Efectivo
 *    responses:
 *      201:
 *       description: Forma de pago creada
 *      401:
 *       description: Forma de pago no creada
 *
 */
router.post(
  "/api/formasDePago",
  authController.authenticated,
  authController.isAdmin,
  function (req, res) {
    let formaDePago = req.body;
    console.log(formaDePago);
    formaDePagoNueva = new FormasDePago(
      formaDePago.codigo,
      formasDePago.nombre
    );
    formasDePago.push(formaDePagoNueva);
    res.send(formaDePagoNueva);
  }
);

module.exports = router;
