
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
        token : req.body.token,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        language : req.body.language,
    }
    let info = [data.email,data.username,data.uid,data.token,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.language];

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
        token : req.body.token,
        descripcio : req.body.descripcio,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        language : req.body.language,
    }
    var target = req.params.useremail;
    let info = [data.email,data.username,data.uid,data.token,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.language];
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
    models.follow(data,res,next);
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
        usuariSeguit: req.query.followed
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

exports.getFollowing = function(req,res,next) {
    var data = {
        usuariSeguidor: req.params.email
    }
    models.getFollowing(data,req,res,next);

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
