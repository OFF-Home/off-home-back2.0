
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


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.findUserByName = function (req,res,next) {
    var data = {
        username: req.params.username
    }
    models.findUserByName(data,req,res,next);

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.follow = function(req,res,next) {
    var data = {
        usuariSeguidor: req.params.username,
        usuariSeguit: req.body.followed
    }
    models.follow(data,req,res,next);
    //models.increaseFollow(req,res,next);
    //models.increaseFollowing(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.unfollow = function(req,res,next) {
    var data = {
        usuariSeguidor: req.params.username,
        usuariSeguit: req.body.followed
    }
    models.unfollow(data,req,res,next);
    //models.decreaseFollow(req,res,next);
    //models.decreaseFollowing(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getFollow = function(req,res,next) {
    var data = {
        usuariSeguit: req.params.username,
    }
    models.getFollow(data,req,res,next);

}
