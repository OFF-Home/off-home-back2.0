var express = require('express');
var router = express.Router();
let xat = require('../services/xats');

/**
 * Et retorna tots els xats d'un usuari que es passa pel body
 */
router.get('/', xat.veureXats);

/**
 * Et retorna tots els missatges d'un xat individual. Es passa els emails dels dos usuaris pel body.
 */

router.get('/individual', xat.veureXatIndividual);

/**
 * Et retorna tots els missatges d'un xat grupal
 */
router.get('/grupal', xat.veureXatGrupal);

/**
 * Es crea un xat entre dos usuaris. Es passa els dos emails pel body.
 */

router.post('/crearIndividual', xat.crearXat);

/**
 * Es crea el xat del grup, una vegada creada l'activitat. Es passa l'usuariCreador i la dataHoraIni pel body.
 */

router.post('/crearGrup', xat.crearXatGrup);

/**
 * Es crea un missatge en el xat individual. Es passa els dos emails identificadors del xat, l'email del que fa el missatge i el missatge pel body.
 */

router.post('/missatgesIndividual', xat.enviarMsg);

/**
 * Es crea un missatge en el xat grupal. Es passa l'usuari creador i la datahora identificadora del xat, l'email del que fa el missatge i el missatge pel body.
 */

router.post('/missatgesGrup', xat.enviarMsgGrup);

/**
 * S'afegeix l'usuari al xat grupal de l'activitat, una veagda s'inscriu a l'activitat. Es passa l'usuari creador i la datahora identificadora del xat, i l'email del nou participant pel body.
 */

router.post('/afegirUsuariXatGrup', xat.afegirUsuariXatGrupal);

module.exports = router;