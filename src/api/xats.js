var express = require('express');
var router = express.Router();
let xat = require('../services/xats');

router.get('/', xat.veureXats);

router.post('/caminada', xat.crearXat);

module.exports = router;