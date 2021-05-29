var express = require('express');
var router = express.Router();
let assoliments = require('../services/assoliments');

/** Funció d'enrutament de la direcció /assoliments/create amb post.
 *  Crea una nova instància a la relació AssolimentsxPersona per indicar que la persona
 *  identificada per useremail ha adquirit l'assoliment identificat per nomassol. */
router.post('/create',assoliments.afegirAssoliment);


/** Funció d'enrutament de la direcció /assoliments?useremail= amb get.
 *  Retorna tots els assoliments que la persona identificada per useremail ha aconseguit. */
router.get('/',assoliments.getAssolimentsComplets);


module.exports = router;
