var db = require('../../database.js')

exports.showTags = function (data,req,res,next) {
    let sql = 'SELECT * ' +
        'FROM TagsxUsuari tu ' +
        'WHERE LOWER(tu.Usuari) = LOWER(?)'
    db.all(sql,[data.username],(err,row) => {
        if(row == null) {
            res.status(204).send('Tags not found');
        }
        else res.json(row);
    });
}


exports.insert_tags = function(data,res,next) {
    console.log(data.username)
    let sql = 'INSERT INTO TagsxUsuari VALUES (?,?);';
    db.run(sql,[data.nomTag,data.username], (err) => {
        if (err) {
            next(err)
        }
        else {
            res.status(200).send('OK');
        }
    });
}

exports.delete_tags = function(data,res,next) {

    let sql = 'DELETE FROM TagsxUsuari WHERE LOWER(nomTag) = LOWER(?) AND LOWER(Usuari) = LOWER(?);';
    db.run(sql,[data.nomTag,data.username],function(err) {
        if (err) {
            res.status(409).json({
                status : err.status,
                message : err.message
            });
        }
        else if (this.changes === 0) {
            res.status(404).send('Participant not found');
        }
        else res.status(200).send('Delete tag al usuario');
    });

}