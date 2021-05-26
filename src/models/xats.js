const firebaseAdmin = require('firebase-admin');
var db = require('../../database.js')

const firebaseDB = firebaseAdmin.database();

exports.veureXats = function(uid,n,data, res) {
    let users = []

    firebaseDB.ref('usuaris/'+uid).once('value', (snapshot) =>
    {
        snapshot.forEach(child=>{
            const id = child.val()
            data.push( id.uid);
        })
        let sql = 'SELECT username FROM Usuaris WHERE uid = ?';
        console.log(data)
        for(let i = 0; i<data.length;i++){
            db.all(sql,data[i], (err, rows) => {
                users.push(rows)
            });
        }
        res.send(users)
    })

}

exports.traduirXats = function (data) {

}


exports.veureXatIndividual = function(usid_1,usid_2,res,next) {


    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(400).send('Emails iguals');
    }
    firebaseDB.ref('xatsIndividuals/'+xatid).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });

}



exports.crearXat = function(usid_1,usid_2,res,next) {

    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(400).send('Emails iguals');
    }

    firebaseDB.ref('usuaris/'+ usid_1).child(xatid).set({
        xatId: xatid,
        uid: usid_2
    })
    firebaseDB.ref('usuaris/'+ usid_2).child(xatid).set({
        xatId: xatid,
        uid: usid_1
    })
    res.send('Creat');
}

exports.enviarMsg = function(info,res,next) {

    let usid_1 = info.usid_1
    let usid_2 = info.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }
    const identificador = info.usid_enviador.concat("_").concat(Date.now())
    const data = {

        id: identificador,
        usid_enviador: info.usid_enviador,
        message: info.message
    };

    firebaseDB.ref('xatsIndividuals/'+xatid).child(identificador).push(data)
    res.send('Enviat');
}

exports.esborrarMsg = function(info,res,next) {

    let missatgeId = info.missatgeId
    let usid_1 = info.usid_1
    let usid_2 = info.usid_2
    var xatid
    if(usid_1 > usid_2){
        xatid = usid_2.concat("_").concat(usid_1)
    }else if(usid_1 < usid_2){
        xatid = usid_1.concat("_").concat(usid_2)
    }else{
        res.status(500).send('Emails iguals');
    }

    firebaseDB.ref('xatsIndividuals/'+xatid+'/'+missatgeId).remove()
    res.send('Esborrat');
}

exports.crearXatGrupal = function(info,res,next) {


    let usid_creador = info.usid_creador
    let dataHoraIni = info.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)


    firebaseDB.ref('usuaris/'+usid_creador).push(activitat)
    firebaseDB.ref('usuaris/'+ usid_creador).child(activitat).set({
        chatId: activitat,
        uid: usid_creador,

    });
    console.log("res")
    res.send('Creat');
}

exports.veureXatGrupal = function(info,res,next) {

    let usid_creador = info.usid_creador
    let dataHoraIni = info.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('xatsGrupals/'+activitat).once('value', (snapshot) =>
    {
        const data = snapshot.val();
        res.send(data);
    });
}


exports.enviarMsgGrup = function(info,res,next) {


    let usid_creador = info.usid_creador
    let dataHoraIni = info.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)

    const identificador = activitat.concat("_").concat(Date.now())
    const data = {

        id: identificador,
        usid_enviador: info.usid_enviador,
        message: info.message
    };

    firebaseDB.ref('xatsGrupals/'+activitat).child(identificador).push(data)
    res.send('Enviat');
}

exports.esborrarMsgGrup = function(info,res,next) {


    let usid_creador = info.usid_creador
    let dataHoraIni = info.dataHoraIni
    let activitat = usid_creador.concat("_").concat(dataHoraIni)
    let missatgeId = info.missatgeId

    firebaseDB.ref('xatsGrupals/'+ activitat+'/'+missatgeId).remove()
    res.send('Esborrat');
}

exports.afegirUsuariXatGrupal = function(info,res,next) {


    let uid_creador = info.usid_creador
    let dataHoraIni = info.dataHoraIni
    let usid_participant = info.usid_participant
    let activitat = uid_creador.concat("_").concat(dataHoraIni)

    firebaseDB.ref('usuaris/'+ usid_participant).push(activitat)
    console.log("yeehaw")
    firebaseDB.ref('usuaris/'+ usid_participant).child(activitat).set({
        chatId: activitat,
        uid: usid_participant,

    });

    console.log("hola")
    res.send('Afegit');
}