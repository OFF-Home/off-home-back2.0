'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/GET Categories:', () => {
    before(function(done){
        db.serialize(() => {
            let sql = 'SELECT *' +
                'FROM Categories;';
            db.run(sql, () => {
                done();
            });
        });
    });
    after(function(done){
        done();
    });
    it('should give us all the categoires', (done) => {
        chai.request(url)
            .get('/categories')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('/GET Activitats by Categories:', () => {
    before(function(done){
        db.serialize(() => {
            let sql = 'SELECT a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi, COUNT(DISTINCT p.usuariParticipant) AS numParticipants FROM Activitats a , Participants p WHERE ' +
                'a.usuariCreador == p.usuariCreador AND a.dataHoraIni == p.dataHoraIni AND LOWER(a.categoria) = LOWER (?) GROUP BY a.usuariCreador , a.numCarrer , a.nomCarrer , a.dataHoraIni , a.categoria, a.maxParticipant , a.titol, a.descripcio, a.dataHoraFi;'

            db.run(sql, ['Running'],() => {
                done();
            });
        });
    });
    after(function(done){
        done();
    });
    it('should give us all the activities in that category', (done) => {
        chai.request(url)
            .get('/categories/Running')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});
