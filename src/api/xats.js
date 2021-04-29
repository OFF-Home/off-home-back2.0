var express = require('express');
var router = express.Router();
let xat = require('../services/xats');

router.get('/', xat.veureXats);

router.post('/crearIndividual', xat.crearXat);

router.post('/crearGrup', xat.crearXatGrup);

router.post('/missatgesIndividual', xat.enviarMsg);

router.post('/missatgesGrup', xat.enviarMsgGrup);

router.post('/afegirUsuariXatGrup', xat.afegirUsuariXatGrupal);

module.exports = router;