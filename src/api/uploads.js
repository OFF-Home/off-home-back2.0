var express = require('express');
var router = express.Router();
let upload = require('../services/uploads');

/**
 * Funció d'enrutament de la direcció /upload/userimage/:email amb post.
 * Retorna OK si s'ha pujat correctement.
 */
router.post('/userimage/:email',upload.uploadImageUser);

/**
 * Funció d'enrutament de la direcció /upload/userimageget/:username amb get.
 * Retorna l'imatge de l'ususari si s'ha trobat l'usuari especificat.
 */
router.get('/userimageget/:username',upload.getImageUserUploaded);

module.exports = router;