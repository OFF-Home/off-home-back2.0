const firebaseAdmin = require('firebase-admin');

const firebaseDB = firebaseAdmin.database();

exports.veureXats = function(req,res,next) {

    let usid_1 = req.body.usid_1


    firebaseDB.ref(usid_1).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}

exports.veureXatIndividual = function(req,res,next) {

    let usid_1 = req.body.usid_1
    let usid_2 = req.body.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }

    firebaseDB.ref('xatsIndividuals/'+xatid).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}



exports.crearXat = function(req,res,next) {

    let usid_1 = req.body.usid_1
    let usid_2 = req.body.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }

    firebaseDB.ref('usuaris/'+ usid_1).push(xatid)
    firebaseDB.ref('usuaris/'+ usid_2).push(xatid)
    res.send('Creat');
}

exports.enviarMsg = function(req,res,next) {

    let usid_1 = req.body.usid_1
    let usid_2 = req.body.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }

    const data = {

        usid_enviador: req.body.usid_enviador,
        message: req.body.message
    };

    firebaseDB.ref('xatsIndividuals/'+xatid).push(data)
    res.send('Enviat');
}

exports.esborrarMsg = function(req,res,next) {

    let missatgeId = req.body.msgId
    let usid_1 = req.body.usid_1
    let usid_2 = req.body.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }



    firebaseDB.ref('xatsIndividuals/'+xatid).child(missatgeId).remove()
    res.send('Esborrat');
}

exports.crearXatGrupal = function(req,res,next) {


    let usid_creador = req.body.usid_creador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)


    firebaseDB.ref('usuaris/'+usid_creador).push(activitat)
    res.send('Creat');
}

exports.veureXatGrupal = function(req,res,next) {


    let usid_creador = req.body.usid_creador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('xatsGrupals/'+activitat).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });
}


exports.enviarMsgGrup = function(req,res,next) {


    let usid_creador = req.body.usid_creador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)

    const data = {

        usid_enviador: req.body.usid_enviador,
        message: req.body.message
    };

    firebaseDB.ref('xatsGrupals/'+activitat).push(data)
    res.send('Enviat');
}

exports.esborrarMsgGrup = function(req,res,next) {


    let usuariCreador = req.body.usid_creador
    let dataHoraIni = req.body.dataHoraIni
    let activitat = usuariCreador.concat("_").concat(dataHoraIni)
    let missatgeId = req.body.msgId

    firebaseDB.ref('xatsGrupals/'+ activitat).child(missatgeId).remove()
    res.send('Esborrat');
}

exports.afegirUsuariXatGrupal = function(req,res,next) {


    let usid_creador = req.body.usid_creador
    let dataHoraIni = req.body.dataHoraIni
    let usid_participant = req.body.email
    let activitat = usid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('usuaris/'+ usid_participant).push(activitat)
    res.send('Afegit');
}