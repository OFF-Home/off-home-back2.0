const firebaseAdmin = require('firebase-admin');

const firebaseDB = firebaseAdmin.database();

exports.veureXats = function(req,res,next) {

    let email1 = req.body.email1


    firebaseDB.ref(email1).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}

exports.veureXatIndividual = function(req,res,next) {

    let email1 = req.body.email1
    let email2 = req.body.email2
    var emailAux
    if(email1 > email2){
        emailAux = email2.concat(email1)
    }else if(email1 < email2){
        emailAux = email1.concat(email2)
    }else{
        res.status(500).send('Emails iguals');
    }

    firebaseDB.ref('xatsIndividuals/'+emailAux).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}



exports.crearXat = function(req,res,next) {

    let email1 = req.body.email1
    let email2 = req.body.email2
    var emailAux
    if(email1 > email2){
        emailAux = email2.concat(email1)
    }else if(email1 < email2){
        emailAux = email1.concat(email2)
    }else{
        res.status(500).send('Emails iguals');
    }

    firebaseDB.ref('usuaris/'+ email1).push(emailAux)
    firebaseDB.ref('usuaris/'+ email2).push(emailAux)
    res.send('Creat');
}

exports.enviarMsg = function(req,res,next) {

    let email1 = req.body.email1
    let email2 = req.body.email2
    var emailAux
    if(email1 > email2){
        emailAux = email2.concat(email1)
    }else if(email1 < email2){
        emailAux = email1.concat(email2)
    }else{
        res.status(500).send('Emails iguals');
    }

    const data = {

        email: req.body.email,
        message: req.body.message
    };

    firebaseDB.ref('xatsIndividuals/'+emailAux).push(data)
    res.send('Enviat');
}

exports.crearXatGrupal = function(req,res,next) {


    let usuariCreador = req.body.usuariCreador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usuariCreador.concat(dataHoraIni)


    firebaseDB.ref('xatsGrupals/'+usuariCreador).push(activitat)
    res.send('Creat');
}

exports.veureXatGrupal = function(req,res,next) {


    let usuariCreador = req.body.usuariCreador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usuariCreador.concat(dataHoraIni)

    firebaseDB.ref('xatsGrupals/'+activitat).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });
}


exports.enviarMsgGrup = function(req,res,next) {


    let usuariCreador = req.body.usuariCreador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usuariCreador.concat(dataHoraIni)

    const data = {

        email: req.body.email,
        message: req.body.message
    };

    firebaseDB.ref('xatsGrupals/'+activitat).push(data)
    res.send('Enviat');
}

exports.esborrarMsgGrup = function(req,res,next) {


    let usuariCreador = req.body.usuariCreador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usuariCreador.concat(dataHoraIni)

    const data = {

        email: req.body.email,
        message: req.body.message
    };

    firebaseDB.ref('xatsGrupals/'+activitat).remove()
    res.send('Enviat');
}

exports.afegirUsuariXatGrupal = function(req,res,next) {


    let usuariCreador = req.body.usuariCreador
    let dataHoraIni = req.body.dataHoraIni
    let emailParticipant = req.body.email
    let activitat = usuariCreador.concat(dataHoraIni)

    firebaseDB.ref('usuaris/'+ emailParticipant).push(activitat)
    res.send('Afegit');
}