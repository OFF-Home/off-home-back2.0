var models = require('../models/xats.js')

exports.veureXats = function(req,res,next) {

    console.log('he entrat uwu')
    let uid = req.params.uid
    let data = []
    models.veureXats(uid,data,res,next)
}

exports.veureXatIndividual = function(req,res,next) {

    let usid_1 = req.query.usid_1
    let usid_2 = req.query.usid_2
    models.veureXatIndividual(usid_1,usid_2,res,next);

}

exports.veureXatGrupal = function(req,res,next) {

    var info = {
        usid_creador: req.query.usid_creador,
        dataHoraIni : req.query.dataHoraIni
    }
    models.veureXatGrupal(info,res,next);

}

exports.crearXat = function(req,res,next) {

    let usid_1 = req.query.usid_1
    let usid_2 = req.query.usid_2

    models.crearXat(usid_1,usid_2,res,next);

}

exports.enviarMsg = function(req,res,next) {

    var info = {
        usid_1 : req.query.usid_1,
        usid_2 :req.query.usid_2,
        usid_enviador: req.body.usid_enviador,
        message: req.body.message
    }
    models.enviarMsg(info,res,next);

}

exports.esborrarMsg = function(req,res,next) {

    var info = {
        missatgeId : req.body.missatgeId,
        usid_1 : req.query.usid_1,
        usid_2 : req.query.usid_2
    }
    models.esborrarMsg(info,res,next);

}

exports.crearXatGrup = function(req,res,next) {

    var info = {
        usid_creador: req.query.usid_creador,
        dataHoraIni : req.query.dataHoraIni
    }

    models.crearXatGrupal(info,res,next);

}

exports.esborrarMsgGrup = function(req,res,next) {

    var info = {
        usid_creador : req.query.usid_creador,
        dataHoraIni : req.query.dataHoraIni,
        missatgeId : req.body.missatgeId
    }
    models.esborrarMsgGrup(info,res,next);

}

exports.enviarMsgGrup = function(req,res,next) {

    var info = {
        usid_creador: req.query.usid_creador,
        dataHoraIni : req.query.dataHoraIni,
        usid_enviador: req.body.usid_enviador,
        message: req.body.message
    }
    models.enviarMsgGrup(info,res,next);

}

exports.afegirUsuariXatGrupal = function(req,res,next) {

    var info = {
        usid_creador: req.query.usid_creador,
        dataHoraIni : req.query.dataHoraIni,
        usid_participant: req.body.usid_participant,
    }
    models.afegirUsuariXatGrupal(info,res,next);

}

exports.sendMessage = function(req,res,next) {
    if (req.body.token == null || req.body.message == null) {
        res.status(400).send('The body has null values');
    }
    else {
        let info = {
            token: req.body.token,
            titol: req.body.titol,
            message: req.body.message
        };
        models.sendMessage(info,res,next);
    }
}