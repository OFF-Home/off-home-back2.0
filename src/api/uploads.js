var express = require('express');
var router = express.Router();
let upload = require('../services/uploads');

/**
 * Funció d'enrutament de la direcció /upload/userimage/:email amb post.
 * Retorna OK si s'ha pujat correctement.
 */
router.post('/userimage/:email',upload.uploadImageUser);

router.get('/userimageget/:username',upload.getImageUserUploaded);

module.exports = router;