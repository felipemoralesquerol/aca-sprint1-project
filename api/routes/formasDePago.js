const express = require("express");
const router = express.Router();

const FormasDePagoModel = require("../models/formaDePago");

const authController = require("../controllers/authController");
const formasDePagoController = require("../controllers/formasDePagoController");

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
  formasDePagoController.list
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
 */
router.post(
  "/api/formasDePago",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.agregar
);

router.delete(
  "/api/formasDePago",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.borrar
);
module.exports = router;

router.update(
  "/api/formasDePago",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.actualizar
);

module.exports = router;
