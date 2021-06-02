

var db = require('../../database.js');
var models = require('../models/activitats.js')

//datahora format es '28-10-2000 19:00:00'

let activitats = require('../models/activitats');
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats = function(req,res,next) {
    var data = {
        username: req.params.username ,
        datahora: req.params.datahora
    }
    models.get_activitats(data,req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.create_activitats = function(req,res,next) {
    var data = {
        usuariCreador: req.params.usuariCreador,
        nomCarrer: req.body.nomCarrer,
        carrerNum: req.body.carrerNum,
        dataHoraIni: req.body.dataHoraIni,
        categoria: req.body.categoria,
        maxParticipants: req.body.maxParticipants,
        titol: req.body.titol,
        descripcio: req.body.descripcio,
        dataHoraFi: req.body.dataHoraFi,
        uid_creador: req.body.uid_creador
    }
    models.create_activitats(data,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.insertUsuariActivitat = function(req,res,next) {
    var data = {
        usuariCreador: req.body.usuariCreador,
        dataHoraIni: req.body.dataHoraIni,
        usuariParticipant: req.body.usuariParticipant
    };
    activitats.insertUsuariActivitat(data,req,res,next)

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteUsuariActivitat = function(req,res,next) {
    var data = {
        usuariCreador: req.body.usuariCreador,
        dataHoraIni: req.body.dataHoraIni,
        usuariParticipant: req.body.usuariParticipant
    };
    activitats.deleteUsuariActivitat(data,req,res,next)

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.filterByData = function(req,res,next) {
    var nom = {
        data: req.params.data
    }
    activitats.filterByData(nom,req,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.filterByTitle = function (req,res,next) {
    var nom = {
        títol: req.params.title
    }
    activitats.filterByTitle(nom,req,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.filterByValoration = function(req,res,next){
    var val = {
        valoration: req.params.valoration

    }
    activitats.filterByValoration(val,req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitatsOrderedByName = function(req,res,next) {
    activitats.get_activitatsOrderedByName(req,res,next);
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitatsOrderedByNameDesc = function(req,res,next) {
    activitats.get_activitatsOrderedByNameDesc(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getActivitatsALesQueParticipo = function(req,res,next) {
    var nom = {
        nom: req.params.email
    }
    activitats.getActivitatsALesQueParticipo(nom,req,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getActivitatsByRadi = function(req,res,next) {
    var data = {
        latitud : req.query.latitud,
        altitud : req.query.altitud,
        distance : req.query.distance
    }
    models.getActivitatsByRadi(data,res,next);

}

/**
 * 
 * @param req
 * @param res
 * @param next
 */
exports.get_activitatsOrderedByDate = function(req,res,next) {
    activitats.get_activitatsOrderedByDate(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.valorarActivitat = function(req,res,next){
    var data = {
        valoracio: req.body.valoracio,
        usuariCreador: req.body.usuariCreador,
        dataHoraIni: req.body.dataHoraIni,
        usuariParticipant: req.body.usuariParticipant,
        comentari: req.body.comentari

    }
    activitats.valorarActivitat(data,req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.calcularPlacesLliures = function(req,res,next) {
    let data = {
        username: req.params.username,
        dataHoraIni: req.params.datahora
    }
    models.placesLliures(data, req, res, next)
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getParticipantsActivitat = function(req,res,next) {
    var data = {
        usuariCreador: req.params.usuariCreador,
        dataHoraIni: req.query.dataHoraIni
    };
    activitats.getParticipantsActivitat(data,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getExplore = function (req,res,next) {
    var data = {
        email: req.params.email
    };
    activitats.getExplore(data,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getValoracio = function (req,res,next) {
    var data = {
        usuariCreador: req.query.usuariCreador,
        usuariParticipant: req.query.usuariParticipant,
        dataHoraIni: req.query.dataHoraIni
    }
    console.log(data.usuariCreador + data.usuariParticipant + data.dataHoraIni);
    activitats.getValoracio(data,req,res,next)
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getComentaris = function (req,res,next ) {
    var data = {
        usuariCreador: req.query.usuariCreador,
        dataHoraIni: req.query.dataHoraIni
    }
    activitats.getComentaris(data,req,res,next)
}


exports.afegirActivities = function(req,res,next) {
    var data = {
        usuariCreador: req.body.usuariCreador,
        datahoraIni: req.body.dataHoraIni,
        usuariGuardador: req.body.usuariGuardador
    }
    activitats.afegirActivities(data,req,res,next)
}

exports.eliminarActivities = function(req,res,next) {
    var data = {
        usuariCreador: req.query.usuariCreador,
        datahoraIni: req.query.dataHoraIni,
            usuariGuardador: req.query.usuariGuardador
    }
    activitats.eliminarActivities(data, req, res, next)
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getActivitatsAcabades = function (req,res,next) {
    if (req.params.useremail == null || req.params.useremail.length === 0) {
        res.status(400).send('The body has null values');
    }
    else {
        activitats.getActivitatsAcabades(req.params.useremail,res,next);
    }
}

exports.getActivitatsGuardades = function(req,res,next){
    var data = {
        usuariGuardador: req.params.email
    }
    activitats.getActivitatsGuardades(data,req,res,next)

}

exports.getActivitatsAmics = function(req,res,next){
    var data = {
        email: req.params.email
    }
    activitats.getActivitatsAmics(data,res,next)
}



