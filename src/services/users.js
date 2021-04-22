
var models = require('../models/users.js')

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.regUsuari = function(req,res,next) {
    var data = {
        email: req.body.email,
        username: req.params.username,
        password : req.body.password,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        language : req.body.language
    }
    let info = [data.email,data.username,data.password,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.language];

    models.regUsuari(info,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.showUsuari = function (req,res,next) {
    var data = {
        username: req.params.username
    }
    models.showUsuari(data,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.updateUsuari = function (req,res,next) {
    var data = {
        email: req.body.email,
        username: req.body.username,
        password : req.body.password,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        tags : req.body.tags,
        language : req.body.language
    }
    var target = req.params.username;
    let info = [data.email,data.username,data.password,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.tags,data.language];
    models.updateUsuari(info,target,res,next);
}


exports.findUserByName = function (req,res,next) {
    models.findUserByName(req,res,next);

}

exports.follow = function(req,res,next) {
    models.follow(req,res,next);
}

exports.unfollow = function(req,res,next) {
    models.unfollow(req,res,next);
}