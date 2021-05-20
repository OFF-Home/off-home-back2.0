var express = require('express');
var router = express.Router();
let assoliments = require('../services/assoliments');

/** Funció d'enrutament de la direcció /categories amb post.
 *  Crea una nova instància a la relació AssolimentsxPersona per indicar que la persona
 *  identificada per useremail ha adquirit l'assoliment identificat per nomassol. */
router.post('/create',assoliments.afegirAssoliment);

module.exports = router;
