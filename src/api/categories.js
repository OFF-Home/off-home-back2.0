var express = require('express');
var router = express.Router();
let categories = require('../services/categories');

/** Funció d'enrutament de la direcció /categories amb get.
 *  Retorna la llista completa de categories, amb tots els seus atributs, de la base de dades */
router.get('/', categories.get_categories);


/** Funció d'enrutament de la direcció /categories/.tagId amb get.
 *  Retorna la llista d'activitats d'una categoria, amb tots els atributs d'aquestes*/
router.get('/:tagId', categories.get_activitats_categoria);

module.exports = router;
