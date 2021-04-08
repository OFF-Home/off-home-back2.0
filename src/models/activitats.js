var db = require('../../database.js')

exports.get_activitats = function (req,res,next) {
    let sql = 'SELECT * ' +
        'FROM Activitats a ' +
        'WHERE a.usuariCreador = ? AND a.dataHoraIni = ?'

    db.run(sql,[req.params.username, req.params.datahora], (err,row) => {
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

exports.create_activitats = function (req,res,next) {
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
        }else res.send('OK');
    });
}