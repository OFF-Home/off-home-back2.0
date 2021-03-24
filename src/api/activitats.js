var express = require('express');
var router = express.Router();
let activitats = require('../services/activitats');


router.get('/', activitats.get_activitats);

router.post('/create/:usuariCreador', activitats.create_activitats);

module.exports = router;