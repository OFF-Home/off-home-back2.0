
var db = require('../../database.js')

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

exports.get_activitats_categoria = function (req,res,next) {
    let sql = 'SELECT *' +
        'FROM Activitats a ' +
        'WHERE a.categoria = ?;';
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