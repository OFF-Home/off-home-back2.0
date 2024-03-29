
var db = require('../../database.js')
var Tree = require('../../tree');
const firebaseAdmin = require('firebase-admin');
const firebaseDB = firebaseAdmin.database();

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
    db.get(sql,[data.username, data.datahora], (err,row) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            });
        }
        else res.send(row);
    });
}

/**
 *
 * @param useremail
 * @param req
 * @param res
 * @param next
 */
exports.getActivitatsAcabades = function (useremail,res,next) {
    let sql = 'SELECT a.*, p.valoracio ' +
        'FROM Activitatsinfo a, Participants p ' +
        'WHERE p.usuariParticipant = ? AND p.usuariCreador = a.usuariCreador AND p.dataHoraIni = a.dataHoraIni AND a.acabada = 1';
    db.all(sql, [useremail], (err,rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length === 0) {
            res.status(404).send('No activities finished');
        }
        else {
            res.send(rows);
        }
    })
}


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitatsOrderedByName = function(req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitatsinfo a ' +
        'WHERE acabada == 0 ' +
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
        'FROM Activitatsinfo a ' +
        'WHERE acabada == 0 ' +
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
        'FROM Activitatsinfo a ' +
        'WHERE acabada == 0 ' +
        'ORDER BY a.dataHoraIni ASC;';
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



function ficarUsuariAFirebase(uid_creador, dataHoraIni, uidAfegir) {

    let activitat = uid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('usuaris/' + uidAfegir).push(activitat)
}
function borrarUsuariAFirebase(uid_creador, dataHoraIni, uidEliminar) {

    let activitat = uid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('usuaris/' + uidEliminar).child(activitat).remove()
}

/**
 *
 * @param data
 * @param res
 * @param next
 */
exports.create_activitats = function (data,res,next) {
    var info = [data.usuariCreador,data.nomCarrer,data.carrerNum,data.dataHoraIni,data.categoria,data.maxParticipants,data.titol,data.descripcio,data.dataHoraFi];
    var infoLloc = [data.nomCarrer,data.carrerNum,data.latitud,data.altitud];
    var infoParticpants = [null,data.usuariCreador,data.dataHoraIni, data.usuariCreador,null];
    let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
    let sqlLlocs = 'INSERT INTO Llocs VALUES (?,?,?,?)';
    let sqlParticipants = 'INSERT INTO Participants VALUES (?,?,?,?,?)';
    var result = []
    ficarUsuariAFirebase(data.uid_creador, data.dataHoraIni, data.uid_creador)
    db.serialize(() => {
        db.run(sqlLlocs,infoLloc, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
        db.run(sql,info,(err) => {
            if (err) {
                res.status(409).json({
                    status: err.status,
                    message: err.message
                });
            }
            else {
                db.run(sqlParticipants,infoParticpants, (error) => {
                    if (error) {
                        next(error);
                    }
                    else {
                        let sqlaux2 = 'SELECT COUNT (*) AS val ' +
                            'FROM Participants p ' +
                            'WHERE p.usuariParticipant = ?';
                        db.get(sqlaux2,[data.usuariCreador],(err2,row) => {
                            console.log('4')
                            if (err2) {
                                next(err2);
                            }
                            else {
                                console.log('5')
                                let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                                if(row.val === 1) {
                                    db.run(sqlinsert,['PARTICIPANT BRONZE',data.usuariCreador]);
                                    result.push('PARTICIPANT BRONZE');
                                }
                                else if(row.val === 10) {
                                    db.run(sqlinsert,['PARTICIPANT SILVER',data.usuariCreador]);
                                    result.push('PARTICIPANT SILVER');
                                }
                                else if(row.val === 25) {
                                    db.run(sqlinsert,['PARTICIPANT GOLD',data.usuariCreador]);
                                    result.push('PARTICIPANT GOLD');
                                }
                                else if(row.val === 50) {
                                    db.run(sqlinsert,['PARTICIPANT PLATINUM',data.usuariCreador]);
                                    result.push('PARTICIPANT PLATINUM');
                                }
                                else if(row.val === 100) {
                                    db.run(sqlinsert,['PARTICIPANT DIAMOND',data.usuariCreador]);
                                    result.push('PARTICIPANT DIAMOND');
                                }
                            }
                        });
                        sqlaux2 = 'SELECT COUNT (*) AS val ' +
                            'FROM Participants p, Activitats a ' +
                            'WHERE p.usuariParticipant = ? and p.usuariCreador = a.usuariCreador and p.dataHoraIni = a.dataHoraIni and a.categoria = ?'
                        db.get(sqlaux2,[data.usuariCreador,data.categoria],(err3,row) => {
                            if (err3) {
                                next(err3);
                            }
                            else {
                                let trofeu;
                                if (data.categoria === 'Running') trofeu = 'RUNNER';
                                else if (data.categoria === 'Skating') trofeu = 'SKATING';
                                else if (data.categoria === 'Walking') trofeu = 'WALKER';
                                else if (data.categoria === 'Cycling') trofeu = 'CYCLING';
                                else if (data.categoria === 'Meditation') trofeu = 'MEDITATION';
                                else if (data.categoria === 'Cultural') trofeu = 'CULTURAL';
                                else if (data.categoria === 'Volunteering') trofeu = 'VOLUNTEERING';
                                else if (data.categoria === 'Gastronomic') trofeu = 'GASTRONOMIC';
                                else if (data.categoria === 'WaterSports') trofeu = 'WATER SPORTS';
                                let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                                if(row.val === 1) {
                                    db.run(sqlinsert,[trofeu + ' BRONZE',data.usuariCreador]);
                                    result.push(trofeu + ' BRONZE');
                                }
                                else if(row.val === 10) {
                                    db.run(sqlinsert,[trofeu + ' SILVER',data.usuariCreador]);
                                    result.push(trofeu + ' SILVER');
                                }
                                else if(row.val === 25) {
                                    db.run(sqlinsert,[trofeu + ' GOLD',data.usuariCreador]);
                                    result.push(trofeu + ' GOLD');
                                }
                                else if(row.val === 50) {
                                    db.run(sqlinsert,[trofeu + ' PLATINUM',data.usuariCreador]);
                                    result.push(trofeu + ' PLATINUM');
                                }
                                else if(row.val === 100) {
                                    db.run(sqlinsert,[trofeu + ' DIAMOND',data.usuariCreador]);
                                    result.push(trofeu + ' DIAMOND');
                                }
                            }
                        });
                        let sqlaux = 'SELECT COUNT (*) as val ' +
                            'FROM Activitats a ' +
                            'WHERE a.usuariCreador = ?;';
                        db.get(sqlaux,[data.usuariCreador],(err4,row) => {
                            if (err4) {
                                next(err4);
                            }
                            else {
                                let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                                if(row.val === 1) {
                                    db.run(sqlinsert,['CREATOR BRONZE',data.usuariCreador]);
                                    result.push('CREATOR BRONZE');
                                }
                                else if(row.val === 10) {
                                    db.run(sqlinsert,['CREATOR SILVER',data.usuariCreador]);
                                    result.push('CREATOR SILVER');
                                }
                                else if(row.val === 25) {
                                    db.run(sqlinsert,['CREATOR GOLD',data.usuariCreador]);
                                    result.push('CREATOR GOLD');
                                }
                                else if(row.val === 50) {
                                    db.run(sqlinsert,['CREATOR PLATINUM',data.usuariCreador]);
                                    result.push('CREATOR PLATINUM');
                                }
                                else if(row.val === 100) {
                                    db.run(sqlinsert,['CREATOR DIAMOND',data.usuariCreador]);
                                    result.push('CREATOR DIAMOND');
                                }
                                res.status(201).json({result});
                            }
                        });
                    }
                });
            }
        });
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
    let sql = 'INSERT INTO Participants VALUES (NULL,?,?,?,NULL)';
    var result = [];
    ficarUsuariAFirebase(data.uid_creador, data.dataHoraIni, data.uid_participant)
    db.serialize(() => {
        db.run(sql,info,(err) => {
            if (err) {
                res.status(409).json({
                    status: err.status,
                    message: err.message
                });
            }
            else {
                let sqlaux2 = 'SELECT COUNT (*) AS val ' +
                    'FROM Participants p ' +
                    'WHERE p.usuariParticipant = ?';
                db.get(sqlaux2,[data.usuariParticipant],(err2,row) => {
                    if (err2) {
                        next(err2);
                    }
                    else {
                        let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                        if(row.val === 1) {
                            db.run(sqlinsert,['PARTICIPANT BRONZE',data.usuariParticipant]);
                            result.push('PARTICIPANT BRONZE');
                            console.log(result)
                        }
                        else if(row.val === 10) {
                            db.run(sqlinsert,['PARTICIPANT SILVER',data.usuariParticipant]);
                            result.push('PARTICIPANT SILVER');
                        }
                        else if(row.val === 25) {
                            db.run(sqlinsert,['PARTICIPANT GOLD',data.usuariParticipant]);
                            result.push('PARTICIPANT GOLD');
                        }
                        else if(row.val === 50) {
                            db.run(sqlinsert,['PARTICIPANT PLATINUM',data.usuariParticipant]);
                            result.push('PARTICIPANT PLATINUM');
                        }
                        else if(row.val === 100) {
                            db.run(sqlinsert,['PARTICIPANT DIAMOND',data.usuariParticipant]);
                            result.push('PARTICIPANT DIAMOND');
                        }
                    }
                });
                sqlaux2 = 'SELECT a2.categoria ' +
                    '      FROM Activitats a2' +
                    '      WHERE a2.usuariCreador = ? and a2.dataHoraIni = ?';
                db.get(sqlaux2,[data.usuariCreador,data.dataHoraIni], (err4,roow) => {
                    if (err4) {
                        next(err4);
                    }
                    else {
                        sqlaux2 = 'SELECT COUNT (*) AS val ' +
                            '                    FROM Participants p, Activitats a ' +
                            '                    WHERE p.usuariParticipant = ? and p.usuariCreador = a.usuariCreador and p.dataHoraIni = a.dataHoraIni and a.categoria = ?;'
                        db.get(sqlaux2,[data.usuariParticipant,roow.categoria],(err3,row) => {
                            if (err3) {
                                next(err3);
                            }
                            else {
                                let trofeu;
                                if (roow.categoria === 'Running') trofeu = 'RUNNER';
                                else if (roow.categoria=== 'Skating') trofeu = 'SKATING';
                                else if (roow.categoria === 'Walking') trofeu = 'WALKER';
                                else if (roow.categoria === 'Cycling') trofeu = 'CYCLING';
                                else if (roow.categoria === 'Meditation') trofeu = 'MEDITATION';
                                else if (roow.categoria === 'Cultural') trofeu = 'CULTURAL';
                                else if (roow.categoria === 'Volunteering') trofeu = 'VOLUNTEERING';
                                else if (roow.categoria === 'Gastronomic') trofeu = 'GASTRONOMIC';
                                else if (roow.categoria === 'WaterSports') trofeu = 'WATER SPORTS';
                                let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                                if(row.val === 1) {
                                    db.run(sqlinsert,[trofeu + ' BRONZE',data.usuariParticipant]);
                                    result.push(trofeu + ' BRONZE');
                                }
                                else if(row.val === 10) {
                                    db.run(sqlinsert,[trofeu + ' SILVER',data.usuariParticipant]);
                                    result.push(trofeu + ' SILVER');
                                }
                                else if(row.val === 25) {
                                    db.run(sqlinsert,[trofeu + ' GOLD',data.usuariParticipant]);
                                    result.push(trofeu + ' GOLD');
                                }
                                else if(row.val === 50) {
                                    db.run(sqlinsert,[trofeu + ' PLATINUM',data.usuariParticipant]);
                                    result.push(trofeu + ' PLATINUM');
                                }
                                else if(row.val === 100) {
                                    db.run(sqlinsert,[trofeu + ' DIAMOND',data.usuariParticipant]);
                                    result.push(trofeu + ' DIAMOND');
                                }
                                res.status(201).json(result);
                            }
                        });
                    }
                });
            }
        });
    });
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
    borrarUsuariAFirebase(data.uid_creador, data.dataHoraIni, data.uid_participant)
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

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
exports.valorarActivitat= function(data,req,res,next) {
    let comentari;
    if (data.comentari == null ) comentari = null
    else comentari = data.comentari
    let sql= 'SELECT * FROM Participants WHERE usuariCreador = ? AND dataHoraIni = ? AND usuariParticipant = ?;'
    var valorar =0
    var result = [];
    db.get(sql,[data.usuariCreador,data.dataHoraIni,data.usuariParticipant], (err,row)=> {

        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        } else if (row == null) {
            res.status(404).send('Activitat no existeix');
        }
        else if(row.valoracio != null) {
            res.status(409).send('Activitat ja valorada');
        }
        else {
            let sql2 = 'UPDATE Participants SET valoracio = ? , comentari = ? WHERE usuariCreador = ? AND dataHoraIni = ? AND usuariParticipant = ?;'
            db.run(sql2, [data.valoracio, comentari, data.usuariCreador, data.dataHoraIni, data.usuariParticipant], (err) => {
                if (err) {
                    res.status(409).json({
                        status: err.status,
                        message: err.message
                    });
                } else if (this.changes === 0) {
                    res.status(404).send('Participant not found');
                } else {
                    let sqlaux = 'SELECT COUNT (*) AS val ' +
                        'FROM Participants p ' +
                        'WHERE p.usuariParticipant = ? and p.valoracio is not null';
                    db.get(sqlaux,[data.usuariParticipant],(err2,row) => {
                        if (err2) {
                            next(err2);
                        }
                        else {
                            let sqlinsert = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
                            if(row.val === 1) {
                                db.run(sqlinsert,['REVIEWER BRONZE',data.usuariParticipant]);
                                result.push('REVIEWER BRONZE');
                                console.log(result)
                            }
                            else if(row.val === 10) {
                                db.run(sqlinsert,['REVIEWER SILVER',data.usuariParticipant]);
                                result.push('REVIEWER SILVER');
                            }
                            else if(row.val === 25) {
                                db.run(sqlinsert,['REVIEWER GOLD',data.usuariParticipant]);
                                result.push('REVIEWER GOLD');
                            }
                            else if(row.val === 50) {
                                db.run(sqlinsert,['REVIEWER PLATINUM',data.usuariParticipant]);
                                result.push('REVIEWER PLATINUM');
                            }
                            else if(row.val === 100) {
                                db.run(sqlinsert,['REVIEWER DIAMOND',data.usuariParticipant]);
                                result.push('REVIEWER DIAMOND');
                            }
                            res.status(200).send({result});
                        }
                    });
                }
            })}
    })
}

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
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

/**
 *
 * @param data
 * @param res
 * @param next
 */
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

/**
 *
 * @param categories_done
 * @param activities_all
 * @param row_data
 */
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

/**
 *
 * @param data
 * @param res
 * @param next
 */
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

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
exports.getValoracio = function(data,req,res,next) {
    let sql = 'SELECT valoracio,comentari FROM Participants WHERE usuariCreador = ? AND usuariParticipant = ? AND dataHoraIni = ?;'
    console.log(data.usuariCreador + data.usuariParticipant + data.dataHoraIni);
    db.get(sql, [data.usuariCreador,data.usuariParticipant,data.dataHoraIni], (err,row) => {
        if (err) {
            next(err);
        }
        else if (row == null) {
            var text = '{"valoracio": null , "comentari": null}';
            var obj = JSON.parse(text);
            res.send(obj)
        }
        else {
            res.send(row); //retorna un json amb la valoració
        }
    })
}

exports.getActivitatsGuardades = function(data,req,res,next) {
    let sql = 'SELECT a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi, COUNT(DISTINCT p.usuariParticipant) AS numParticipants  FROM Activitats a, Participants p WHERE (a.usuariCreador,a.dataHoraIni) IN ( SELECT la.usuariCreador, la.dataHoraIni FROM likedActivities la WHERE la.usuariGuardador == ?) AND a.usuariCreador == p.usuariCreador AND a.dataHoraIni == p.dataHoraIni ' +
        ' GROUP BY a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi;';
    db.all(sql,[data.usuariGuardador], (err, rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length == 0) {
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

/**
 *
 * @param data
 * @param req
 * @param res
 * @param next
 */
exports.getComentaris = function(data,req,res,next) {
    let sql = 'SELECT u.username,p.comentari FROM Participants p, Usuaris u WHERE  p.usuariParticipant == u.email and p.usuariCreador = ? AND p.dataHoraIni = ? ;'
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


exports.afegirActivities = function(data,req,res,next) {
    let sql = 'INSERT INTO likedActivities VALUES (?,?,?)';
    db.run(sql,[data.usuariCreador,data.datahoraIni,data.usuariGuardador],(err) => {
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
 * @param useremail
 * @param res
 * @param next
 */
exports.getActivitatsAcabades = function (useremail,res,next) {
    let sql = 'SELECT a.*, p.valoracio ' +
        'FROM Activitatsinfo a, Participants p ' +
        'WHERE p.usuariParticipant = ? AND p.usuariCreador = a.usuariCreador AND p.dataHoraIni = a.dataHoraIni AND a.acabada = 1';
    db.all(sql, [useremail], (err,rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length === 0) {
            res.status(404).send('No activities finished');
        }
        else {
            res.send(rows);
        }
    })
}

exports.eliminarActivities = function(data,req,res,next) {
    let sql = 'SELECT * FROM likedActivities  where usuariCreador == ? and dataHoraIni == ? and usuariGuardador == ?';
    db.get(sql,[data.usuariCreador,data.datahoraIni,data.usuariGuardador],(err,row) => {
        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        }
        else if (row == null) {
            res.status(404).send('Activity is not in liked activities');
        }
        else {
            let sql2 = 'DELETE FROM likedActivities where usuariCreador == ? and dataHoraIni == ? and usuariGuardador == ?';
            db.run(sql2, [data.usuariCreador, data.datahoraIni, data.usuariGuardador], (err) => {
                if (err) {
                    res.status(409).json({
                        status: err.status,
                        message: err.message
                    });
                } else res.status(204).send('OK');
            })
        }
    })

}

exports.getActivitatsAmics = function(data,res,next){

    let sql= 'SELECT a.*, COUNT(DISTINCT p.usuariParticipant) AS numParticipants FROM Activitatsinfo a, Participants p WHERE a.acabada == 0 AND a.usuariCreador = p.usuariCreador AND a.dataHoraIni = p.dataHoraIni AND a.usuariCreador IN (SELECT usuariSeguit FROM Segueix WHERE usuariSeguidor == ?)' +
        '        GROUP BY a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi ' +
        '        ORDER BY a.dataHoraIni'
    db.all(sql, [data.email], (err,rows) => {

        if (err) {
            res.status(409).json({
                status: err.status,
                message: err.message
            });
        } else if (rows.length === 0) {
            res.status(404).send('No activities found');
        } else res.send(rows);
    })
}



