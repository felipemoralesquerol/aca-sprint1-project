const express = require('express');
let router = express.Router();

/**
 * @swagger
 * /programa:
 *  get:
 *    tags: [generales]
 *    summary: programa
 *    description : Resto
 *    responses:
 *     200: 
 *       description: programa
 */
router.get('/', function (req, res) {
    res.send({ programa: "Resto v1.0.2" })
});

module.exports = router;