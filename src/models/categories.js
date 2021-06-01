var db = require('../../database.js');


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_categories = function (req,res,next) {

    let sql = 'SELECT *' +
        'FROM Categories;';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.json({
                status: err.message,
                message: err.message
            })
        } else if (rows.length == 0) {
            res.status(204).send('No categories found');
        }
        else res.send(rows);
    })

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats_categoria = function (data,req,res,next) {
    let sql = 'SELECT a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi, COUNT(DISTINCT p.usuariParticipant) AS numParticipants FROM Activitats a , Participants p WHERE ' +
    'a.usuariCreador == p.usuariCreador AND a.dataHoraIni == p.dataHoraIni AND LOWER(a.categoria) = LOWER (?) GROUP BY a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi;'
    db.all(sql,[data],(err,rows) => {
        if(err) {
            res.json({
                status : err.status,
                message : err.message
            });
        }
        else if (rows.length == 0) {
            res.status(204).send('No activities found in the category');
        }
        else res.send(rows);
    });

}
