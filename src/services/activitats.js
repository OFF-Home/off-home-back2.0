
var db = require('../../database.js');

//datahora format es '28-10-2000 19:00:00'
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats = function(req,res,next) {
    var data = {
        username: req.params.username,
        datahora: req.params.datahora

    }
    console.log(data);
    let sql = 'SELECT * ' +
            'FROM Activitats a ' +
            'WHERE a.usuariCreador = ? AND a.dataHoraIni = ?'

    db.get(sql,[data.username,data.datahora], (err,row) => {
       if (err) {
           res.json({
               status: err.status,
               message: err.message
           });
       }
       else if (row == null) {
           res.send('No Activity Found');
       }
       res.json(row);
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.create_activitats = function(req,res,next) {
    var data = {
        usuariCreador: req.params.usuariCreador,
        nomCarrer: req.body.nomCarrer,
        carrerNum: req.body.carrerNum,
        dataHoraIni: req.body.dataHoraIni,
        categoria: req.body.categoria,
        maxParticipants: req.body.maxParticipants,
        titol: req.body.titol,
        descripcio: req.body.descripcio,
        dataHoraFi: req.body.dataHoraFi
    }
    var info = [data.usuariCreador,data.nomCarrer,data.carrerNum,data.dataHoraIni,data.categoria,data.maxParticipants,data.titol,data.descripcio,data.dataHoraFi];
    let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
    db.run(sql,info,(err) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        }
        res.send('OK');
    });
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

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.filterByData = function(req,res,next) {
    var nom = {
        data: req.params.data
    }
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'WHERE a.dataHoraIni = ?;';
    db.all(sql, [nom.data], (err, rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        } else if (rows == null) {
            res.send('Activities Not Found');
        }
        res.send(rows);
    });
}

exports.filterByTitle = function (req,res,next) {
    var nom = {
        títol: req.params.title
    }
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'WHERE LOWER(a.titol) = LOWER(?);';
    db.all(sql, [nom.títol], (err, rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        } else if (rows == null) {
            res.send('Activities Not Found');
        }
        res.send(rows);
    });
}

exports.get_activitatsOrderedByName = function(req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'ORDER BY a.titol ASC;';
    db.all(sql, (err, rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        } else if (rows == null) {
            res.send('Activities Not Found');
        }
        res.send(rows);
    });

}