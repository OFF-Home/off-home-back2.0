var express = require('express');
var router = express.Router();
let tags = require('../services/tags');

/**
 *  Funció d'enrutament de la direcció /tags/:username/show amb el mètode get, on @username és el nom d'usuari.
 *  Obté totes les instàncies de TagsXUsuari amb l'usuari de la url. */
router.get('/:username/show',tags.showTags);

/**
 *  Funció d'enrutament de la direcció /tags/:username/insert amb el mètode post, on @username és el nom d'usuari.
 *  Afegeix la instància de TagsXUsuari amb l'usuari de la url i els paràmetres necessaris del body */
router.post('/:username/insert',tags.insert_tags);

/**
 *  Funció d'enrutament de la direcció /tags/:username/delete amb el mètode post, on @username és el nom d'usuari.
 *  Elimina la instància de TagsXUsuari amb l'usuari de la url i els paràmetres necessaris del body */

router.delete('/:username/delete/:nomTag',tags.delete_tags);

module.exports = router;