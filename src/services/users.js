
var db = require('../../database.js')

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.regUsuari = function(req,res,next) {
    var data = {
        email: req.body.email,
        username: req.params.username,
        password : req.body.password,
        birthDate :req.body.birthDate,
        descripcio : req.body.description,
        followers : req.body.followers,
        following : req.body.following,
        darkmode : req.body.darkmode,
        notificacions : req.body.notificacions,
        estrelles : req.body.estrelles,
        tags : req.body.tags,
        language : req.body.language
    }
    let info = [data.email,data.username,data.password,data.birthDate,data.descripcio,data.followers,data.following,data.darkmode,data.notificacions,data.estrelles,data.tags,data.language];
    let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql,info, (err) => {
        if (err) {
            res.json({
                status: err.status,
                message: err.message
            })
        }
        res.send('OK');
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.showUsuari = function (req,res,next) {
    var data = {
        username: req.params.username
    }
    console.log(data);
    let sql = 'SELECT * ' +
        'FROM Usuaris u ' +
        'WHERE u.username = ?'
    db.get(sql,[data.username],(err,row) => {
        if(row == null) {
            res.send('User not found');
        }
        res.json(row);
    });
}