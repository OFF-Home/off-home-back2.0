const firebaseAdmin = require('firebase-admin');
var db = require('../../database.js')

const firebaseDB = firebaseAdmin.database();

/*exports.firstStep = function (uid,n,data, users, res, next) {
    veureXats(uid,n,data, users, res, next)
    next(traduirXats(data, users, res, next))
    console.log('bueno')
}*/

exports.traduirUid = function(uid,res,next){
    let sql = 'SELECT * FROM Usuaris WHERE uid = ?';

    db.get(sql, uid, (err, row) => {
        res.status(201).send(row)
    })

}

exports.veureXats = function (uid,data, res, next) {

    firebaseDB.ref('usuaris/'+uid).once('value', (snapshot) =>
    {
        snapshot.forEach(child=>{
            const id = child.val()
            data.push( id);
        })
        res.send(data)
    })
}


/*function ordenarXats(data, users,res) {
    let sql = 'SELECT username FROM Usuaris WHERE uid = ?';
    db.serialize(() => {
        for (let i = 0; i < data.length; i++) {
            console.log(i)
            if(i === data.length-1){
                console.log('yeehaw'+ i)
                db.get(sql, [data[data.length-1]], (err, row) => {
                    users.push(row.username)
                    res.send(users)
                })
            }else {
                db.get(sql, [data[i]], (err, row) => {
                    users.push(row.username)
                    console.log('rows    ' + row.username)
                    console.log(users)
                })
            }
            console.log('aaaaaaa          ' + users)
        }
    })

}

function traduirXats(data, users, res, next) {
    console.log('traduir funcio')
    next(ordenarXats(data,users, res))
}
*/


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

    firebaseDB.ref('usuaris/'+ usid_1).push(usid_2)
    firebaseDB.ref('usuaris/'+ usid_2).push(usid_1)
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


exports.sendMessage = function(info,res,next) {
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    const payload = {
        notification: {
            title: info.titol,
            body: info.message
        }
    };
    let sql = 'SELECT u.token FROM Usuaris u WHERE u.email = ?';
    db.get(sql,[info.email], (err,row) => {
        if (err) {
            next(err);
        }
        else if (row == null) {
            res.status(404).send('User not found');
        }
        else {
            const token = row.token
            firebaseAdmin.messaging().sendToDevice(token, payload, notification_options)
                .then( response => {

                    res.status(200).send("Notification sent successfully")

                })
                .catch( error => {
                    console.log(error);
                    next(error);
                });
        }
    })
}