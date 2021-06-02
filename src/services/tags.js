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
    var data = {
        username: req.params.username
    }
    models.showTags(data,req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.insert_tags = function(req,res,next) {
    var data = {
        nomTag: req.body.nomTag,
        username: req.params.username,
    }
    models.insert_tags(data,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.delete_tags = function(req,res,next) {
    var data = {
        nomTag: req.params.nomTag,
        username: req.params.username,
    }
    models.delete_tags(data,res,next);
}