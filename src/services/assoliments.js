var model = require('../models/assoliments')


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.afegirAssoliment = function (req,res,next) {
    if (req.body.nomassol == null || req.body.useremail == null) {
        res.status(400).send('The body has null values');
    }
    else {
        data = {
            nomassol: req.body.nomassol,
            useremail: req.body.useremail
        };
        model.afegirAssolimentCompletat(data,res,next);
    }

}