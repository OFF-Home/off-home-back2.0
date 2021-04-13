
var model = require('../models/uploads')

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