var models = require('../models/xats.js')

exports.veureXats = function(req,res,next) {
    models.veureXats(req,res,next);

}

exports.crearXat = function(req,res,next) {
    models.crearXat(req,res,next);

}