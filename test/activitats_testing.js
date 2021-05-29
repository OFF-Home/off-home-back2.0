'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/GET SearchByRadi:', () => {
    before(function(done){
        db.serialize(() => {
            let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            let sql2 = 'INSERT INTO Llocs VALUES (?,?,?,?)';
            let sql3 = 'INSERT INTO Categories VALUES (?,?)';
            let sql4 = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(sql,['josep@gmail.com','josep','2365']);
            db.run(sql2,['C/Font',25,41.401703,2.175327])
            db.run(sql3,['Training','Train']);
            db.run(sql4,['josep@gmail.com','C/Font',25,'19-04-2021 18:00:00','Training',10,'Play','playing','19-04-2021 19:00:00'], () => {
                done();
            });
        });
    });
    after(function(done){
        db.serialize(() => {
            let sql = 'DELETE FROM Activitats WHERE usuariCreador = ? and dataHoraIni = ?';
            let sql2= 'DELETE FROM Usuaris WHERE username = ?;';
            let sql3 = 'DELETE FROM Llocs WHERE nomCarrer = ? and numCarrer = ?';
            let sql4 = 'DELETE FROM Categories WHERE categoria = ?';
            db.run(sql,['josep@gmail.com','19-04-2021 18:00:00']);
            db.run(sql2,['josep']);
            db.run(sql3,['C/Font',25]);
            db.run(sql4,['Training']);
        })
        done();
    });
    it('should return the activity', (done) => {
        chai.request(url)
            .get('/activitats/searchbyradi')
            .send({latitud:41.400922, altitud:2.174286, distance:3})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.an('array');
                done();
            });
    });
    it('should not return anything', (done) => {
        chai.request(url)
            .get('/activitats/searchbyradi')
            .send({latitud:41.400922, altitud:2.174286, distance:0.1})
            .end(function(err,res) {
                expect(res).to.have.status(204);
                done();
            });
    });
});

describe('/GET Participants Activitat:', () => {
    before(function (done) {
        db.serialize(() => {
            let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, ['jess@gmail.com', 'jess', '2365']);
            db.run(sql, ['jess2@gmail.com', 'jess2', '56567']);
            sql = 'INSERT INTO Llocs VALUES (?,?,?,?)';
            db.run(sql, ['C/Font', 25, 41.401703, 2.175327]);
            sql = 'INSERT INTO Categories VALUES (?,?)'
            db.run(sql, ['Train', 'Trai']);
            sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(sql, ['jess@gmail.com', 'C/Font', 25, '19-04-2021 18:00:00', 'Train', 10, 'Play', 'playing', '19-04-2021 19:00:00']);
            db.run(sql, ['jess@gmail.com', 'C/Font', 25, '30-04-2021 18:00:00', 'Train', 10, 'Play', 'playing', '30-04-2021 19:00:00']);
            sql = 'INSERT INTO Participants VALUES (?,?,?,?,?)';
            db.run(sql,[null,'jess@gmail.com','19-04-2021 18:00:00','jess2@gmail.com',null],() => {
                done();
            });
        });
    });
    after(function (done) {
        db.serialize(() => {
            let sql = 'DELETE FROM Participants WHERE usuariCreador = ? and dataHoraIni = ?';
            db.run(sql, ['jess@gmail.com','19-04-2021 18:00:00']);
            sql = 'DELETE FROM Activitats WHERE usuariCreador = ? and dataHoraIni = ?';
            db.run(sql, ['jess@gmail.com', '19-04-2021 18:00:00']);
            db.run(sql, ['jess@gmail.com', '30-04-2021 18:00:00']);
            sql = 'DELETE FROM Usuaris WHERE username = ?;';
            db.run(sql, ['jess']);
            db.run(sql, ['jess2']);
            sql = 'DELETE FROM Llocs WHERE nomCarrer = ? and numCarrer = ?';
            db.run(sql, ['C/Font', 25]);
            sql = 'DELETE FROM Categories WHERE categoria = ?';
            db.run(sql, ['Train']);
        })
        done();
    });
    it('should return the participant', (done) => {
        chai.request(url)
            .get('/activitats/participants/jess@gmail.com?dataHoraIni=19-04-2021 18:00:00')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.an('array');
                done();
            });
    });
    it('should not return anything', (done) => {
        chai.request(url)
            .get('/activitats/participants/jess@gmail.com?dataHoraIni=30-04-2021 18:00:00')
            .end(function (err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });
});

describe('/GET ActivitatsAcabadesParticipades:', () => {
    before(function (done) {
        db.serialize(() => {
            let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            let sql2 = 'INSERT INTO Llocs VALUES (?,?,?,?)';
            let sql4 = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
            let sql5 = 'INSERT INTO Participants VALUES (?,?,?,?,?)';
            db.run(sql, ['jaime@gmail.com', 'jaime', '2365']);
            db.run(sql2, ['C/Fanal', 25, 41.401703, 2.175327])
            db.run(sql4, ['jaime@gmail.com', 'C/Fanal', 25, '2021-02-10 18:00:00', 'Running', 10, 'Play', 'playing', '2021-02-10 19:00:00']);
            db.run(sql5, ['2', 'jaime@gmail.com', '2021-02-10 18:00:00', 'jaime@gmail.com', null], () => {
                done();
            });
        });
    });
    after(function (done) {
        db.serialize(() => {
            let sql = 'DELETE FROM Participants WHERE usuariCreador = ? and dataHoraIni = ?';
            db.run(sql, ['jaime@gmail.com', '2021-02-10 18:00:00']);
            sql = 'DELETE FROM Activitats WHERE usuariCreador = ? and dataHoraIni = ?';
            db.run(sql, ['jaime@gmail.com', '2021-02-10 18:00:00']);
            sql = 'DELETE FROM Usuaris WHERE username = ?;';
            db.run(sql, ['jaime']);
            sql = 'DELETE FROM Llocs WHERE nomCarrer = ? and numCarrer = ?';
            db.run(sql, ['C/Fanal', 25]);
            sql = 'DELETE FROM Categories WHERE categoria = ?';
            db.run(sql, ['Running']);
        })
        done();
    });
    it('should return the activity', (done) => {
        chai.request(url)
            .get('/activitats/acabades/jaime@gmail.com')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.an('array');
                done();
            });
    });
    it('should return anything', (done) => {
        chai.request(url)
            .get('/activitats/acabades/josele@gmail.com')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.text).to.eql('No activities finished');
                done();
            });
    });
});