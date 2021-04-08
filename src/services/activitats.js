
var db = require('../../database.js');
var models = require('../models/activitats.js')

//datahora format es '28-10-2000 19:00:00'
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats = function(req,res,next) {
    models.get_activitats(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.create_activitats = function(req,res,next) {
    models.create_activitats(req,res,next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.insertUsuariActivitat = function(req,res,next) {
    var data = {
        usuariCreador: req.body.usuariCreador,
        dataHoraIni: req.body.dataHoraIni,
        usuariParticipant: req.body.usuariParticipant
    };
    var info = [data.usuariCreador,data.dataHoraIni,data.usuariParticipant];
    let sql = 'INSERT INTO Participants VALUES (?,?,?)';
    db.run(sql,info,(err) => {
        if (err) {
            res.json({
                status : err.status,
                message : err.message
            });
        }
        res.send('OK');
    })
}