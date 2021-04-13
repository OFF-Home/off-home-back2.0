
var db = require('../../database.js')

exports.updateUsuari = function(info,target,res,next) {
    let sql = 'UPDATE Usuaris SET ';
    let n = info.length;
    let first = true;
    let input = [];
    let entries = ['email','username','password','birthDate','description','followers','following','darkmode','notifications','estrelles','tags','language'];
    for (let i = 0; i < n; ++i) {
        if (info[i] != null && first) {
            sql += entries[i] + ' = ?';
            input.push(info[i]);
            first = false;
        }
        else if (info[i] != null) {
            sql += ',' + entries[i] + ' = ?';
            input.push(info[i]);
        }
    }
    sql += ' WHERE username = ?;';
    input.push(target);
    db.run(sql,input, function(err) {
        if (err) {
            next(err);
        }
        else if (this.changes === 0) {
            res.send('User Not Found');
        }
        else {
            res.send ('User has been updated');
        }
    });
}

exports.findUserByName = function(req,res,next){
    var data = {
        username: req.params.username
    }
    let sql = 'SELECT * ' +
        'FROM Usuaris u ' +
        'WHERE LOWER(u.email)= LOWER(?)'
    db.get(sql,[data.username],(err,row) => {
        if(row == null) {
            var respo = 'User ' + data.username + ' not found';
            res.send(respo);
        }
        res.json(row);
    });
}