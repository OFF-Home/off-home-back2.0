
var db = require('../../database.js')
let categories = require('../models/categories');
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_categories = function (req,res,next) {
    categories.get_categories(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats_categoria = function (req,res,next) {
    data=req.params.tagId;
    categories.get_activitats_categoria(data,req,res,next);
}