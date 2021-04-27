const firebaseAdmin = require('firebase-admin');

const firebaseDB = firebaseAdmin.database();

exports.veureXats = function(req,res,next) {

    firebaseDB.ref('xats').once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}


exports.crearXat = function(req,res,next) {
    const data = {
        nomActivitat: req.body.nomActivitat
    };
    firebaseDB.ref('xats').push(data)
    res.send('GOTCHA');
}