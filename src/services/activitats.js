
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
    console.log(data);
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