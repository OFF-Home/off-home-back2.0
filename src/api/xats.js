var express = require('express');
var router = express.Router();
let xat = require('../services/xats');

router.post('/caminada', xat.crearXatGrup);

module.exports = router;