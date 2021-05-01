
var db = require('../../database.js')

/**
 *
 * @param req
 * @param res
 * @param next
 */
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


/**
 *
 * @param req
 * @param res
 * @param next
 */
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
        } else if (rows.length==0) {
            res.status(204).send('Activities Not Found');
        }
        else res.send(rows);
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
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
        } else if (rows.length==0) {
            res.status(204).send('Activities Not Found');
        }
        else res.send(rows);
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
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
        } else if (rows.length==0) {
            res.status(204).send('Activities Not Found');
        }
        else res.send(rows);
    });
}

/**
 *
 * @param nom
 * @param req
 * @param res
 * @param next
 */
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
        else if (rows.length==0) {
            res.status(204).send('No Activity Found');
        }
        else res.json(rows);
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
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

/**
 *
 * @param nom
 * @param req
 * @param res
 * @param next
 */
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
        } else if (rows.length==0) {
            res.status(204).send('Activities Not Found');
        }
        else res.send(rows);
    });

}

/**
 *
 * @param val
 * @param req
 * @param res
 * @param next
 */
exports.filterByValoration = function(val,req,res,next) {
    console.log(val.valoration)
    let sql = ' SELECT * FROM Activitats a WHERE (a.usuariCreador,a.dataHoraIni) IN (SELECT p.usuariCreador, p.dataHoraIni FROM Participants p WHERE p.valoracio = ?);';

    db.all(sql, [val.valoration], (err, rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        } else if (rows.length==0) {
            res.status(204).send('Participants Not Found');
        }
        else res.send(rows);
    });

}

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
exports.insertUsuariActivitat = function(data,req,res,next){
    var info = [data.usuariCreador,data.dataHoraIni,data.usuariParticipant];
    let sql = 'INSERT INTO Participants VALUES (NULL,?,?,?)';
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
 * @param data
 * @param req
 * @param res
 * @param next
 */
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

/**
 *
 * @param nom
 * @param req
 * @param res
 * @param next
 */
exports.getActivitatsALesQueParticipo = function (nom,req,res,next){
    let sql = 'SELECT * FROM Activitats a WHERE TIME() < a.dataHoraIni AND (a.usuariCreador,a.dataHoraIni) IN ( SELECT p.usuariCreador, p.dataHoraIni FROM Participants p WHERE p.usuariParticipant == ?);';
    db.all(sql,[nom.nom], (err, rows) => {
        if (rows.length == 0) {
            res.status(204).send('Activities Not Found');
        }
        else if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        }
        else res.send(rows);

    });
}

function GetKilometros(lat1,lon1,lat2,lon2) {
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
}

/**
 *
 * @param info
 * @param res
 * @param next
 */
exports.getActivitatsByRadi = function(info,res,next) {
    let sql = 'SELECT * ' +
        'FROM Activitats a , Llocs l ' +
        'WHERE ' +
        'a.nomCarrer = l.nomCarrer and a.numCarrer = l.numCarrer '
    db.all(sql,[],(err,rows) => {
        if (err) {
            next(err);
        }
        else {
            let data = [];
            rows.forEach(function(row) {
                let distance = parseFloat(GetKilometros(info.latitud,info.altitud,row.latitud,row.altitud));
                if(distance <= parseFloat(info.distance)) {
                    row.distance = distance;
                    data.push(row);
                }
            });
            if (data.length == 0) {
                res.status(204).send('No activities near');
            }
            else {
                res.send(data);
            }
        }
    });
}