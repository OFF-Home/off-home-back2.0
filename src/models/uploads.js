
var db = require('../../database.js')
var fs = require('fs');


/**
 *
 * @param path_img
 * @param email
 * @param res
 * @param next
 */
function updateImage(path_img,email,res,next) {
    let sql = 'UPDATE Usuaris SET image = ? ' +
        'WHERE email = ?;';
    db.run(sql, [path_img, email.email], (err) => {
        if (err) {
            next(err);
        } else {
            res.send('OK');
        }
    });
}

/**
 *
 * @param path_img
 * @param email
 * @param res
 * @param next
 */
exports.uploadImageUser = function(path_img,email,res,next) {
    let sql = 'SELECT image ' +
        'FROM Usuaris ' +
        'WHERE email = ?;';
    db.get(sql, [email.email], (err, row) => {
        if (err) {
            next(err);
        }
        else if (row.image == path_img) {
            res.send('OK');
        }
        else if (row.image != null) {
            try {
                fs.unlinkSync(row.image);
                updateImage(path_img,email,res,next);

            } catch (err) {
                next(err);
            }
        }
        else {
            updateImage(path_img,email,res,next);
        }
    });
}

/**
 *
 * @param data
 * @param res
 * @param next
 */
exports.getImageUser = function (data,res,next) {
    let sql;
    if (data.username.includes('@')) {
        sql = 'SELECT u.image ' +
            'FROM Usuaris u ' +
            'WHERE u.email = ?';
    }
    else {
        sql = 'SELECT u.image ' +
            'FROM Usuaris u ' +
            'WHERE u.username = ?';
    }
    db.get(sql,[data.username],(err,row) => {
        if (err) {
            next(err);
        }
        else if (row == null) {
            res.status(404).send('User Not Found');
        }
        else {
            fs.readFile(row.image, function(err,data) {
                if (err) {
                    next(err);
                }
                else {
                    res.writeHead(200, {'Content-Type': 'image/jpeg'});
                    res.end(data);
                }
            })
        }
    })
}
