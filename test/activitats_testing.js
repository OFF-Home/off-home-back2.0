'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/GET SearchByRadi:', () => {
    before(function(done){
        let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        db.run(sql,['josep@gmail.com','josep','2365']);
        sql = 'INSERT INTO Llocs VALUES (?,?,?,?)';
        db.run(sql,['C/Font',25,41.401703,2.175327]);
        sql = 'INSERT INTO Categories VALUES (?,?)'
        db.run(sql,['Training','Train']);
        sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
        db.run(sql,['josep@gmail.com','C/Font',25,'19-04-2021 18:00:00','Training',10,'Play','playing','19-04-2021 19:00:00']);
        done();
    });
    after(function(done){
        let sql = 'DELETE FROM Activitats WHERE usuariCreador = ? and dataHoraIni = ?';
        db.run(sql,['josep@gmail.com','19-04-2021 18:00:00']);
        sql= 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql,['josep']);
        sql = 'DELETE FROM Llocs WHERE nomCarrer = ? and numCarrer = ?';
        db.run(sql,['C/Font',25]);
        sql = 'DELETE FROM Categories WHERE categoria = ?';
        db.run(sql,['Training']);
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
                expect(res).to.have.status(200);
                expect(res.text).to.eql('No activities near');
                done();
            });
    });
});
