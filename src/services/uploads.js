
var model = require('../models/uploads')

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.uploadImageUser = function(req,res,next) {
        let email = {
            email: req.params.email
        }
        let EDFile = req.files.file;
        EDFile.mv(`./images/${EDFile.name}`,err => {
            if (err) {
                next(err);
            }
            else {
                model.uploadImageUser(`./images/${EDFile.name}`,email,res,next)
            }
        });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getImageUserUploaded = function(req,res,next) {
    let data = {
        username: req.params.username
    }
    model.getImageUser(data,res,next);
}