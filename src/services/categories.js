
var db = require('../../database.js')

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_categories = function (req,res,next) {
    let sql = 'SELECT *' +
        'FROM Categories;';
    db.all(sql,[], (err,rows) => {
        if(err) {
            res.json({
                status : err.message,
                message: err.message
            })
        }
        else if(rows == null) {
            res.send('Categories Not Found');
        }
        res.send(rows);
    })
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.get_activitats_categoria = function (req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'WHERE LOWER(a.categoria) = LOWER (?);';
    db.all(sql,[req.params.tagId],(err,rows) => {
        if(err) {
            res.json({
                status : err.status,
                message : err.message
            });
        }
        else if (rows == null) {
            res.send('Activities Not Found');
        }
        res.send(rows);
    });
}