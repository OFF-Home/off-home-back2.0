
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

exports.get_activitatsOrderedByNameDesc = function(req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'ORDER BY a.titol DESC;';
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

exports.get_activitatsOrderedByDate = function(req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'ORDER BY a.dataHoraIni DESC;';
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

exports.filterByTitle = function(nom, req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'WHERE LOWER(a.titol) = LOWER(?);';
    db.all(sql, [nom.títol], (err, rows) => {

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

exports.filterByData = function(nom, req,res,next) {
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

exports.filterByValoration = function(val,req,res,next) {
    console.log(val.valoration)
    let sql = ' SELECT * FROM Activitats a WHERE (a.usuariCreador,a.dataHoraIni) IN (SELECT p.usuariCreador, p.dataHoraIni FROM Participants p WHERE p.valoracio = ?);';

    db.all(sql, [val.valoration], (err, rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        } else if (rows == null) {
            res.send('Participants Not Found');
        }
        res.send(rows);
    });

}

exports.insertUsuariActivitat = function(data,req,res,next){
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

exports.deleteUsuariActivitat = function(data,req,res,next){
    var info = [data.usuariCreador,data.dataHoraIni,data.usuariParticipant];
    let sql = 'DELETE FROM Participants WHERE LOWER(usuariCreador) = LOWER(?) AND ' +
        'LOWER(dataHoraIni) = LOWER(?) AND LOWER(usuariParticipant) = LOWER(?);';
    db.run(sql,info,(err) => {
        if (err) {
            res.json({
                status : err.status,
                message : err.message
            });
        }
        res.send('Usuari Eliminat');
    })
}

exports.getActivitatsALesQueParticipo = function (nom,req,res,next){
    let sql = 'SELECT * FROM Activitats a WHERE TIME() < a.dataHoraIni AND (a.usuariCreador,a.dataHoraIni) IN ( SELECT p.usuariCreador, p.dataHoraIni FROM Participants p WHERE p.usuariParticipant == ?);';
    db.all(sql,[nom.nom], (err, rows) => {
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