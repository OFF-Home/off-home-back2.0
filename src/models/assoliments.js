var db = require('../../database.js')


/**
 *
 * @param data
 * @param res
 * @param next
 */
exports.afegirAssolimentCompletat = function(data,res,next) {
    let sql = 'INSERT INTO AssolimentsxPersona VALUES (?,?)';
    db.run(sql,[data.nomassol,data.useremail], (err) => {
        if (err) {
            next(err);
        }
        else {
            console.log('eee')
            res.status(201).send('CREATED')
        }
    })
}

/**
 *
 * @param useremail
 * @param res
 * @param next
 */
exports.getAssolimentsCompletats = function(useremail,res,next) {
    let sql = 'SELECT a.nom , a.descripcio ' +
        'FROM AssolimentsxPersona ap, Assoliments a ' +
        'WHERE ap.useremail = ? AND ap.nomassol = a.nom;';
    db.all(sql,[useremail],(err,rows) => {
        if (err) {
            next(err);
        }
        else if (rows.length === 0) {
            res.status(204).send("No content");
        }
        else {
            res.status(200).send(rows);
        }
    });
}