var db = require('../../database.js');
var models = require('../models/tags.js')

//datahora format es '28-10-2000 19:00:00'
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.showTags = function(req,res,next) {
    models.showTags(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.insert_tags = function(req,res,next) {
    models.insert_tags(req,res,next);
}

exports.delete_tags = function(req,res,next) {
    models.delete_tags(req,res,next);
}