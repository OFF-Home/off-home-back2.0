
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
        uid : req.body.uid,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        language : req.body.language,
    }
    let info = [data.email,data.username,data.uid,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.language];

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
        uid : req.body.uid,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        tags : req.body.tags,
        language : req.body.language,
        usid: req.body.usid
    }
    var target = req.params.username;
    let info = [data.email,data.username,data.uid,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.tags,data.language];
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
    models.unfollow(data,res,next);
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
        usuariSeguit: req.params.email
    }
    models.getFollow(data,req,res,next);

}


exports.getEstrelles = function(req,res,next) {
    var data = {
        email: req.params.email
    }
    console.log(data.email)
    models.getEstrelles(data, res, next);

}


exports.deleteUsuari = function(req,res,next) {
    var data = {
        email: req.params.email
    }

    models.deleteUsuari(data,res,next);

}
