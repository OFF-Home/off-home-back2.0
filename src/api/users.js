var express = require('express');
var router = express.Router();
let user = require('../services/users');

router.get('/:email/estrelles',user.getEstrelles)
/**
 * Funció d'eliminar un usuari amb el mètode delete, on l'@email es l'usuari esborrat.
 */
router.delete('/delete/:email',user.deleteUsuari);

/**
 *  Funció d'enrutament de la direcció /users/:username/create amb el mètode post, on @username és el nom d'usuari.
 *  Crea una instància d'Usuari amb l'usuari de la url i els paràmtres necessaris del body */
router.post('/:username/create', user.regUsuari);

/**
 * Funció d'enrutament de la direcció /users/:username/follow , on @username és el nom d'usuari, amb mètode post.
 * Crea una instància de Segueix amb l'email de l'usuari de la uri i l'email de l'usuari del body.
 */
router.post('/:username/follow', user.follow);
/**
 * Funció d'enrutament de la direcció /users/:username/unfollow , on @username és el nom d'usuari, amb mètode delete.
 * Elimina una instància de Segueix amb l'usuari de la ui i l'usuari del body.
 */
router.delete('/:username/unfollow',user.unfollow);

/**
 * Funció d'enrutament de la direcció /users/:username/getFollow , on @username és el nom d'usuari, amb el mètode get.
 * Retorna tota la informació dels usuaris seguidors del usuari passat per la uri.
 */
router.get('/:email/getFollow', user.getFollow);

/**
 * Funció d'enrutament de la direcció /users/:username/getFollowing , on @username és el nom d'usuari, amb el mètode get.
 * Retorna tota la informació dels usuaris seguits per l'usuari passat per la uri.
 */
router.get('/:email/getFollowing', user.getFollowing);
/**
 *  Funció d'enrutament de la direcció /users/:username/show amb el mètode get, on @username és el nom d'usuari.
 *  Retorna l'informació de l'usuari @username */
router.get('/:username/show', user.showUsuari);

/**
 * Funció d'enrutament de la direcció /users/:username/update amb el mètode post, on @username és el nom d'usuari.
 * Actualitza la informació de l'usuari amb la informació del body
 */
router.put('/:username/update',user.updateUsuari);


/**
 * Funció d'enrutament de la direcció /users/:username amb el mètode get, on @username és el nom d'usuari.
 * Retorna tota la informació de l'usuari.
 */
router.get('/:username/',user.findUserByName);






module.exports = router;
