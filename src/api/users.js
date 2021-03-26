var express = require('express');
var router = express.Router();
let user = require('../services/users');


/**
 *  Funció d'enrutament de la direcció /users/:username/create amb el mètode post, on @username és el nom d'usuari.
 *  Crea una instància d'Usuari amb l'usuari de la url i els paràmtres necessaris del body */
router.post('/:username/create', user.regUsuari);
/* GET per obtenir info d'usuaris */

/**
 *  Funció d'enrutament de la direcció /users/:username/show amb el mètode get, on @username és el nom d'usuari.
 *  Retorna l'informació de l'usuari @username */
router.get('/:username/show', user.showUsuari);


module.exports = router;
