var models = require('../models/xats.js')

exports.veureXats = function(req,res,next) {
    models.veureXats(req,res,next);

}

exports.crearXat = function(req,res,next) {
    models.crearXat(req,res,next);

}

exports.enviarMsg = function(req,res,next) {
    models.enviarMsg(req,res,next);

}

exports.crearXatGrup = function(req,res,next) {
    models.crearXatGrupal(req,res,next);

}

exports.enviarMsgGrup = function(req,res,next) {
    models.enviarMsgGrup(req,res,next);

}

exports.afegirUsuariXatGrupal = function(req,res,next) {
    models.afegirUsuariXatGrupal(req,res,next);

}
