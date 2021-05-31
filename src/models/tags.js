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


exports.insert_tags = function(data,req,res,next) {
    console.log(data.nomTag)
    let sql = 'INSERT INTO TagsxUsuari VALUES (?,?)';
    db.get(sql,[data.nomTag,data.username],(err,row) => {
        if(row == null) {
            console.log('he entrat aqí')
            res.status(201).send('Insert tag al usuario');
        }
        else res.status(409).json(row);
    });
}

exports.delete_tags = function(data,req,res,next) {

    let sql = 'DELETE FROM TagsxUsuari WHERE LOWER(nomTag) = LOWER(?) AND LOWER(Usuari) = LOWER(?);';
    db.get(sql,[data.nomTag,data.username],(err,row) => {
        if(row == null) {
            res.status(200).send('Delete tag al usuario');
        }
        else res.status(409).json(row);
    });
}