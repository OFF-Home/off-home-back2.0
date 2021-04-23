var db = require('../../database.js')

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.showTags = function (req,res,next) {
    var data = {
        username: req.params.username
    }
    let sql = 'SELECT * ' +
        'FROM TagsxUsuari tu ' +
        'WHERE LOWER(tu.Usuari) = LOWER(?)'
    db.get(sql,[data.username],(err,row) => {
        if(row == null) {
            res.send('Tags not found');
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
exports.insert_tags = function(req,res,next) {
    var data = {
        nomTag: req.body.nomTag,
        username: req.params.username,
    }
    let sql = 'INSERT INTO TagsxUsuari VALUES (?,?)';
    db.get(sql,[data.nomTag,data.username],(err,row) => {
        if(row == null) {
            res.send('Insert tag al usuario');
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
exports.delete_tags = function(req,res,next) {
    var data = {
        nomTag: req.body.nomTag,
        username: req.params.username,
    }
    let sql = 'DELETE FROM TagsxUsuari WHERE LOWER(nomTag) = LOWER(?) AND LOWER(Usuari) = LOWER(?);';
    db.get(sql,[data.nomTag,data.username],(err,row) => {
        if(row == null) {
            res.send('Delete tag al usuario');
        }
        res.json(row);
    });
}