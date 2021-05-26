var express = require('express');
var router = express.Router();
var activitats = require('../services/activitats.js');

/** Funció d'enrutament de la direcció /activitats/acabades/:useremail amb get, on @useremail és l'email d'un usuari existent.
 *  Retornar les activitats acabades per l'usuari*/
router.get('/acabades/:useremail', activitats.getActivitatsAcabades);

/** Funció d'enrutament de la direcció /activitats/:usuariCreador amb post, on @usuariCreador és l'email d'un usuari existent.
 *  Crea una instància d'activitat amb l'usuari de la url i els paràmtres necessaris del body */
router.post('/create/:usuariCreador', activitats.create_activitats);

/**
 * Funció d'enrutament de la direcció /activitats/participants/valoracio amb el mètode get.
 * Retorna la valoració d'un determinat participant de l'activitat especificada.
 */
router.get('/participants/valoracio', activitats.getValoracio)

/**
 * Funció d'enrutament de la direcció /activitats/participants/comentaris amb el mètode get.
 * Retorna els comentaris que han fet els usuaris a una determinada activitat.
 */
router.get('/participants/comentaris', activitats.getComentaris )

/**
 * Funció d'enrutament de la direcció /activitats/participants/:usuariCreador amb el mètode get.
 * Retorna tots els usuaris que participen a l'activitat especificada.
 */
router.get('/participants/:usuariCreador',activitats.getParticipantsActivitat);

/**
 * Funció d'enrutament de la direcció /activitats/explore amb el mètode get.
 * Retorna totes les activitats de la base de dades ordenades segons rellevancia per l'usuari.
 */
router.get('/explore/:email',activitats.getExplore);

/**
 * Funció d'enrutament de la direcció /activitats/searchbyraadi amb el mètode get.
 * Retorna activitats dins del radi indicat.
 */
router.get('/searchbyradi',activitats.getActivitatsByRadi );
/**
 * Funció d'enrutament de la direcció /activitats/orderByName, amb el mètode get.
 * Retorna activitats ordenades per nom de forma ascendent.
 */
router.get('/orderByName',activitats.get_activitatsOrderedByName);
/**
 * Funció d'enrutament de la direcció /activitats/orderByNameDesc, amb el mètode get.
 * Retorna activitats ordenades per nom de forma descendent.
 */
router.get('/orderByNameDesc',activitats.get_activitatsOrderedByNameDesc);
/**
 * Funció d'enrutament de la direcció /activitats/orderByDate, amb el mètode get.
 * Retorna les activitats ordenades per data de més recent a menys.
 */
router.get('/orderByDate',activitats.get_activitatsOrderedByDate);

/**
 * Funció d'enrutament de la direcció /activitats/:email, amb el mètode get.
 * Retorna activitats  a les que participa l'usuari.
 */
router.get('/:email',activitats.getActivitatsALesQueParticipo);

/**
 * Funció d'enrutament de la direcció  /activitats/filterByData/:data, amb el mètode get.
 * Retorna activitats a dataHoraIni igual a data.
 */
router.get('/filterByData/:data',activitats.filterByData);
/**
 * Funció d'enrutament de la direcció  /activitats/filterByTitle/:title, amb el mètode get.
 * Retorna activitats amb el títol indicat.
 */
router.get('/filterByTitle/:title',activitats.filterByTitle);

/**
 * Funció d'enrutament de la direcció /activitats/filterByValoration/:valoration, amb el mètode get.
 * Retorna activitats amb la valoració indicada.
 */
router.get('/filterByValoration/:valoration',activitats.filterByValoration);
/**
 *  Funció d'enrutament de la direcció /activitats/:username/:datahora amb el mètode get, on @username és l'email  i datahora la data i l'hora d'una activitat existent.
 *  Retorna la informació d'una activitat, identificada per aquests dos paràmetres */
router.get('/:username/:datahora',activitats.get_activitats);

/**
 *  Funció d'enrutament de la direcció /activitats/placeslliures amb el mètode get.
 *  Retorna el número de places lliures que queden a l'activitat */
router.get('/:username/:datahora/placeslliures', activitats.calcularPlacesLliures)


/** Funció d'enrutament de la direcció /activitats/inserusuari amb post.
 *  Crea una instància de participants amb els paràmetres necessaris del body*/
router.post('/insertusuari',activitats.insertUsuariActivitat);

/** Funció d'enrutament de la direcció /activitats/avalorar amb post.
 *  Afegeix una valoració a la instància Participant*/
router.put('/valorar',activitats.valorarActivitat)

/** Funció d'enrutament de la direcció /activitats/deleteUsuari amb post.
 *  Elimina una instància de participants amb els paràmetres necessaris del body*/
router.post('/deleteUsuari',activitats.deleteUsuariActivitat);


module.exports = router;
