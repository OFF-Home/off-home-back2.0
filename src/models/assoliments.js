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