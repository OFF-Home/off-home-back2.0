
var db = require('../../database.js')
var fs = require('fs');


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
