
var db = require('../../database.js')


/**
 *
 * @param info
 * @param res
 * @param next
 */
exports.regUsuari = function(info,res,next) {
    let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    db.run(sql,info, (err) => {
        if (err) {
            next(err);
        }
        else {
            res.status(201).send('OK');
        }
    });
}

/**
 *
 * @param info
 * @param res
 * @param next
 */
exports.showUsuari = function(info,res,next) {
    let sql = 'SELECT * ' +
        'FROM Usuaris u ' +
        'WHERE u.email = ?'
    db.get(sql,[info.username],(err,row) => {
        if(row == null) {
            res.status(404).send('User not found');
        }
        else if (err) {
            next(err);
        }
        else res.json(row);
    });
}

/**
 *
 * @param info
 * @param target
 * @param res
 * @param next
 */
exports.updateUsuari = function(info,target,res,next) {
    let sql = 'UPDATE Usuaris SET ';
    let n = info.length;
    let first = true;
    let input = [];
    let entries = ['email','username','uid','token','description','followers','following','darkmode','notifications','estrelles','language'];
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
    sql += ' WHERE email = ?;';
    input.push(target);
    db.run(sql,input, function(err) {
        if (err) {
            next(err);
        }
        else if (this.changes === 0) {
            res.status(404).send('User Not Found');
        }
        else {
            res.send ('User has been updated');
        }
    });
}


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.findUserByName = function(data,req,res,next){
    let sql = 'SELECT * ' +
        'FROM Usuaris u ' +
        'WHERE LOWER(u.username)= LOWER(?)'
    db.get(sql,[data.username],(err,row) => {
        if(row == null) {
            var respo = 'User ' + data.username + ' not found';
            res.status(404).send(respo);
        }
        else res.json(row);
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.follow = function(data,res,next) {
    let sql = 'INSERT INTO Segueix VALUES (?,?)';
    let sqlfollower = 'UPDATE Usuaris SET followers = followers+1 WHERE LOWER(email) = LOWER(?)';
    let sqlfollowing = 'UPDATE Usuaris SET following = following+1 WHERE LOWER(email) = LOWER(?)';

    db.serialize(() => {
        db.run(sql,[data.usuariSeguidor,data.usuariSeguit], (err) => {
            if (err) {
                next(err);
            }
        });
        db.run(sqlfollower,[data.usuariSeguit], function(err) {
            if (err) {
                next(err);
            }
        });
        db.run(sqlfollowing,[data.usuariSeguidor], function(err) {
            if (err) {
                next(err);
            }
        });
        res.status(200).send('Followed correctly');
    })


}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.unfollow = function(data,res,next) {

    let sql = 'DELETE FROM Segueix WHERE usuariSeguidor == ? AND usuariSeguit == ? ';
    let sqlfollower = 'UPDATE Usuaris SET followers = followers-1 WHERE LOWER(email) = LOWER(?)';
    let sqlfollowing = 'UPDATE Usuaris SET following = following-1 WHERE LOWER(email) = LOWER(?)';

    db.serialize(() => {
        db.run(sql,[data.usuariSeguidor,data.usuariSeguit], (err) => {
            if (err) {
                next(err);
            }
        });
        db.run(sqlfollower,[data.usuariSeguit], function(err) {
            if (err) {
                next(err);
            }
        });
        db.run(sqlfollowing,[data.usuariSeguidor], function(err) {
            if (err) {
                next(err);
            }
        });
        res.status(204).send('Unfollowed correctly');
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getFollow = function(data,req,res,next) {

    let sql = 'SELECT usuariSeguidor FROM Segueix WHERE LOWER(usuariSeguit) == LOWER(?);';
    db.all(sql,[data.usuariSeguit], (err, rows) => {
        if (err) {
            next(err);
        }
        else {
            res.send(rows);
        }
    });
}

exports.getFollowing = function(data,req,res,next) {

    let sql = 'SELECT usuariSeguit FROM Segueix WHERE LOWER(usuariSeguidor) == LOWER(?);';
    db.all(sql,[data.usuariSeguidor], (err, rows) => {
        if (err) {
            next(err);
        }
        else {
            res.send(rows);
        }
    });
}

exports.getFollowingPlus = function(data,req,res,next) {

    let sql = 'SELECT u.* FROM Usuaris u WHERE u.email IN (SELECT s.usuariSeguit FROM Segueix s WHERE LOWER(s.usuariSeguidor) == LOWER(?));';
    db.all(sql,[data.usuariSeguidor], (err, rows) => {
        if (err) {
            next(err);
        }
        else {
            res.send(rows);
        }
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.increaseFollow = function(req,res,next) {
    var data = {
        usuariSeguit: req.body.followed
    }

    let sql = 'UPDATE Usuaris SET followers = followers+1 WHERE LOWER(email) = LOWER(?)';

    db.run(sql,[data.usuariSeguit], function(err) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.increaseFollowing = function(req,res,next) {
    var data = {
        usuariSeguidor: req.params.username,
    }

    let sql = 'UPDATE Usuaris SET following = following+1 WHERE LOWER(email) = LOWER(?)';

    db.run(sql,[data.usuariSeguidor], function(err) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.decreaseFollow = function(req,res,next) {
    var data = {
        usuariSeguit: req.body.followed
    }

    let sql = 'UPDATE Usuaris SET followers = followers-1 WHERE LOWER(email) = LOWER(?)';

    db.run(sql,[data.usuariSeguit], function(err) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.decreaseFollowing = function(req,res,next) {
    var data = {
        usuariSeguidor: req.params.username,
    }

    let sql = 'UPDATE Usuaris SET following = following-1 WHERE LOWER(email) = LOWER(?)';

    db.run(sql,[data.usuariSeguidor], function(err) {
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

exports.getEstrelles = function(data,res,next) {

    let sql = 'SELECT AVG(valoracioMitjana) AS estrelles FROM ValoracioActivitats va WHERE usuariCreador == ?'
    db.get(sql,[data.email],(err,row) => {
        console.log(row)
        if (err) {
            res.status(500).json({
                status: err.status,
                message: err.message
            });
        }
        else if (row == null) {
            res.status(404).send('This user cannot have a valoration');
        }
        else res.status(200).send(row);

    })
}


exports.deleteUsuari = function(data,res,next){

    let sql = 'DELETE FROM Usuaris WHERE LOWER(email) = LOWER(?)';

    db.run(sql,[data.email], (err) => {
        if (err) {
            res.status(409).json({
                status : err.status,
                message : err.message
            });
        }

        else{
            res.send('Usuari deleted');
        }
    });
}



