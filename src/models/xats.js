const firebaseAdmin = require('firebase-admin');

const firebaseDB = firebaseAdmin.database();

exports.crearXatGrup = function(req,res,next) {
    const data = {
        nomActivitat: req.body.nomActivitat
    };
    firebaseDB.ref('xats').push(data)
    res.send('GOTCHA');
}