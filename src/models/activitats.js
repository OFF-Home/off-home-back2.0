
var db = require('../../database.js')
//var Tree = require('../../tree');

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats = function (data,req,res,next) {
    let sql = 'SELECT * ' +
        'FROM Activitats a ' +
        'WHERE a.usuariCreador = ? AND a.dataHoraIni = ?'

    db.all(sql,[data.username, data.datahora], (err,rows) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        }
        else if (rows.length == 0) {
            res.status(204).send('No Activity Found');
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

exports.create_activitats = function (data,req,res,next) {
    var info = [data.usuariCreador,data.nomCarrer,data.carrerNum,data.dataHoraIni,data.categoria,data.maxParticipants,data.titol,data.descripcio,data.dataHoraFi];
    let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
    db.run(sql,info,(err) => {
        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        }
        else res.status(201).send('OK');
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
    valoration=parseInt(val.valoration)

    let sql = ' SELECT * FROM Activitats a WHERE ? = (SELECT round(AVG(p.valoracio),0) FROM Participants p WHERE a.usuariCreador = p.usuariCreador AND a.dataHoraIni = p.dataHoraIni );';

    db.all(sql, [valoration], (err, rows) => {
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
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        }
        else res.status(201).send('OK');
    })
}

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
exports.deleteUsuariActivitat = function(data,req,res,next){ //sempre retorna ok, no sé com comprovar si ha borrat algo
    var info = [data.usuariCreador,data.dataHoraIni,data.usuariParticipant];
    let sql = 'DELETE FROM Participants WHERE LOWER(usuariCreador) = LOWER(?) AND ' +
        'LOWER(dataHoraIni) = LOWER(?) AND LOWER(usuariParticipant) = LOWER(?);';
    db.run(sql,info,(err) => {
        if (err) {
            res.status(409).json({
                status : err.status,
                message : err.message
            });
        }
        else res.send('Participant Eliminat de la activitat');
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
    let sql = 'SELECT * FROM Activitats a WHERE datetime("now") < a.dataHoraIni AND (a.usuariCreador,a.dataHoraIni) IN ( SELECT p.usuariCreador, p.dataHoraIni FROM Participants p WHERE p.usuariParticipant == ?);';
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
    var rad = function(x) {return x*Math.PI/180;}
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


exports.valorarActivitat= function(data,req,res,next) {
    let comentari;
    if (data.comentari == null ) comentari = null
    else comentari = data.comentari
    let sql= 'SELECT * FROM Participants WHERE usuariCreador = ? AND dataHoraIni = ? AND usuariParticipant = ? AND valoracio <> null;'
    var valorar =0
    db.all(sql,[data.usuariCreador,data.dataHoraIni,data.usuariParticipant], (err,rows)=> {
        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        } else if (rows.length == 0) {
            res.status(404).send('Activitat ja valorada');
        }
        else { valorar = 1}
    })
    if (valorar == 1) {
        let sql2 = 'UPDATE Participants SET valoracio = ? , comentari = ? WHERE usuariCreador = ? AND dataHoraIni = ? AND usuariParticipant = ?;'
        db.run(sql2, [data.valoracio, comentari, data.usuariCreador, data.dataHoraIni, data.usuariParticipant], (err) => {
            if (err) {
                res.status(409).json({
                    status: err.status,
                    message: err.message
                });
            } else if (this.changes === 0) {
                res.status(404).send('Participant not found');
            } else res.status(200).send('Activity successfully valorated');
        })
    }

}

exports.placesLliures = function(data,req,res,next) {
    let maxParticipant = 0;
    let placesOcupades = 0;
    let sql = 'SELECT maxParticipant FROM Activitats WHERE usuariCreador = ? AND dataHoraIni = ?;'
    db.get(sql, [data.username, data.dataHoraIni], (err, row) => {

        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        } else if (row == null) {
            res.status(404).send('Activitat no trobada');
        } else {
            //console.log('Max:' + row['maxParticipant'])
            maxParticipant = parseInt(row['maxParticipant']);
        }

    })

    let sql2 = 'Select DISTINCT usuariParticipant FROM Participants WHERE usuariCreador = ? AND dataHoraIni = ?;'
    db.all(sql2, [data.username, data.dataHoraIni], (err, rows) => {
        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        } else if (rows.length == 0) {
            res.status(404).send('Activitat no trobada');
        } else {
            //console.log('Entro en el else')
            //console.log('Ocupades' + rows.length)
            placesOcupades = parseInt(rows.length);
        }

    })
    if (maxParticipant - placesOcupades >= 0) {
        res.send('True')
    } else res.send('False')
}

exports.getParticipantsActivitat = function(data,res,next) {
    let sql = 'SELECT u.username ' +
        'FROM Participants p, Usuaris u ' +
        'WHERE p.usuariCreador = ? AND p.dataHoraIni = ? AND u.email = p.usuariParticipant ';
    db.all(sql,[data.usuariCreador,data.dataHoraIni],(err,rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length == 0) {
            res.status(204).send('No users in the activity');
        }
        else {
            res.send(rows);
        }
    });
}

function createTree(categories_done,activities_all,row_data) {
    var tree = new Tree("root");
    let n = row_data.length;
    for (let i = 0; i < n; ++i) {
        //afegim el primer nivell de fills corresponent a les dates
        let data_tree = tree.addChild(row_data[i].dataHoraIni);
        let len = categories_done.length
        for (let t = 0; t < len; ++t) {
            //afegim el segon nivell de fills corresponent a categories de mes rellevants a menys
            let categorie_tree= data_tree.addChild(categories_done[t].categoria);
        }
    }
    let n_all = activities_all.length;
    for (let i = 0; i < n_all; ++i) {
        //afegim l'ultim nivell corresponent a les activitats per despres fer el recorregut
        tree.addLeaf(activities_all[i]);
    }
   // console.log(tree);
    return tree.readTree();
}

exports.getExplore = function(data,res,next) {
    let sql_all = 'SELECT * ' +
        '        FROM ActivitatsInfo a ' +
        '        WHERE a.acabada = 0 ' +
        '        ORDER BY a.dataHoraIni;';
    let sql2_all_done = 'SELECT a.categoria ' +
        '        FROM ActivitatsInfo a , Participants p ' +
        '        WHERE a.usuariCreador = p.usuariCreador AND a.dataHoraIni = p.dataHoraIni AND p.usuariParticipant = ? AND a.acabada = 1 ' +
        '        group by a.categoria ' +
        '        order by count(*) desc;';
    db.all(sql2_all_done,[data.email],(err,rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length == 0) {
            let sql_aux = 'SELECT * ' +
                'FROM ActivitatsInfo a ' +
                'WHERE a.acabada = 0 ' +
                'ORDER BY a.dataHoraIni';
            db.all(sql_aux, [], (err, rows_all) => {
                if (err) {
                    next(err);
                }
                else if (rows_all == null) {
                    res.status(204).send('No activities available');
                }
                else {
                    res.send(rows_all);
                }
            });
        }
        else {
            db.all(sql_all,[],(err,rows_tot) => {
                if (err) {
                    next(err);
                }
                else if (rows_tot.length == 0) {
                    res.status(204).send('No activities available');
                }
                else {
                    let sqlaux2= 'SELECT DISTINCT a.dataHoraIni ' +
                        '        FROM ActivitatsInfo a ' +
                        '        WHERE a.acabada = 0 ' +
                        '        ORDER BY a.dataHoraIni;';
                    db.all(sqlaux2,[],(err,row_data) => {
                        if (err) {
                            next(err);
                        } else {
                            let sqlaux3 = 'SELECT c.categoria ' +
                                'FROM Categories c ';
                            db.all(sqlaux3,[],(err,tot_cat) => {
                                if(err) {
                                    next(err);
                                }
                                else {
                                    //console.log(tot_cat);
                                    tot_cat.forEach((cat) => {
                                        let bool = false;
                                        let n = rows.length;
                                        for(let i = 0; i < n && !bool; ++i) {
                                            if(cat.categoria == rows[i].categoria) {
                                                bool = true;
                                            }
                                        }
                                        if(!bool) rows.push(cat);
                                    });
                                    let result = createTree(rows,rows_tot,row_data);
                                    res.send(result);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

}

exports.getValoracio = function(data,req,res,next) {
    let sql = 'SELECT valoracio,comentari FROM Participants WHERE usuariCreador = ? AND usuariParticipant = ? AND dataHoraIni = ?;'
    console.log(data.usuariCreador + data.usuariParticipant + data.dataHoraIni);
    db.get(sql, [data.usuariCreador,data.usuariParticipant,data.dataHoraIni], (err,row) => {
        if (err) {
            next(err);
        }
        else if (row == null) {
            res.status(404).send('Activity not valorated');
        }
        else {
            res.send(row); //retorna un json amb la valoració
        }
    })
}

exports.getComentaris = function(data,req,res,next) {
    let sql = 'SELECT usuariParticipant,comentari FROM Participants WHERE usuariCreador = ? AND dataHoraIni = ?;'
    db.all(sql, [data.usuariCreador, data.dataHoraIni], (err,rows) =>
    {
        if (err) {
            next(err);
        }
        else if (rows.length == 0) {
            res.status(404).send('No comentaries for this activity');
        }
        else {
            res.send(rows); //retorna un json amb la valoració
        }
    })
}