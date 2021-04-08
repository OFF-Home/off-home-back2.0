var express = require('express');
var router = express.Router();
let activitats = require('../services/activitats');


router.get('/orderByName',activitats.get_activitatsOrderedByName);
router.get('/:email',activitats.getActivitatsALesQuueParticipo);
router.get('/filterByData/:data',activitats.filterByData);
router.get('/filterByTitle/:title',activitats.filterByTitle);
/**
 *  Funció d'enrutament de la direcció /activitats/:username/:datahora amb el mètode get, on @username és l'email  i datahora la data i l'hora d'una activitat existent.
 *  Retorna la informació d'una activitat, identificada per aquests dos paràmetres */
router.get('/:username/:datahora',activitats.get_activitats);

/** Funció d'enrutament de la direcció /activitats/:usuariCreador amb post, on @usuariCreador és l'email d'un usuari existent.
 *  Crea una instància d'activitat amb l'usuari de la url i els paràmtres necessaris del body */
router.post('/create/:usuariCreador', activitats.create_activitats);

/** Funció d'enrutament de la direcció /activitats/inserusuari amb post.
 *  Crea una instància de participants amb els paràmetres necessaris del body*/
router.post('/insertusuari',activitats.insertUsuariActivitat);





module.exports = router;