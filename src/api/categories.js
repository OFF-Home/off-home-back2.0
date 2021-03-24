var express = require('express');
var router = express.Router();
let categories = require('../services/categories');


router.get('/', categories.get_categories);

router.get('/:tagId', categories.get_activitats_categoria);

module.exports = router;
