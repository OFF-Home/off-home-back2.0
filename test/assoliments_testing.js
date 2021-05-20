'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/POST AfegirAssolimentComplet:', () => {
    before(function (done) {
        db.serialize(() => {
            let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, ['pepa@gmail.com', 'pepa', '130'], () => {
                done();
            });
        });
    });
    after(function (done) {
        let sql = 'DELETE FROM AssolimentsxPersona WHERE useremail = ?;'
        db.run(sql,['pepa@gmail.com']);
        sql = 'DELETE FROM Usuaris WHERE username = ?';
        db.run(sql, ['pepa']);
        done();
    });
    it('should create the instance of assoliment complert', (done) => {
        chai.request(url)
            .post('/assoliments/create')
            .send({nomassol: 'CREATOR GOLD', useremail: 'pepa@gmail.com'})
            .end(function (err, res) {
                expect(res).to.have.status(201);
                expect(res.text).to.eql('CREATED');
                done();
            });
    });
    it('should can not add the instance because this assoliment does not exists', (done) => {
        chai.request(url)
            .post('/assoliments/create')
            .send({nomassol: 'CREATOR WOOD', useremail: 'pepa@gmail.com'})
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });
    it('should can not add the instance because its a bad request', (done) => {
        chai.request(url)
            .post('/assoliments/create')
            .send({useremail: 'pepa@gmail.com'})
            .end(function (err, res) {
                expect(res).to.have.status(400);
                expect(res.text).to.eql('The body has null values');
                done();
            });
    });
});

describe('/GET GetAssolimentsCompletats:', () => {
    before(function (done) {
        db.serialize(() => {
            let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, ['polo@gmail.com', 'polo', '130']);
            sql = 'INSERT INTO AssolimentsxPersona VALUES (?,?)'
            db.run(sql, ['CREATOR BRONZE', 'polo@gmail.com'], () => {
                done();
            });
        });
    });
    after(function (done) {
        db.serialize(() => {
            let sql = 'DELETE FROM AssolimentsxPersona WHERE useremail = ?;'
            db.run(sql, ['polo@gmail.com']);
            sql = 'DELETE FROM Usuaris WHERE username = ?';
            db.run(sql, ['polo']);
        });
        done();
    });
    it('should return the trophy', (done) => {
        chai.request(url)
            .get('/assoliments?useremail=polo@gmail.com')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.an('array');
                done();
            });
    });
    it('should return bad request status', (done) => {
        chai.request(url)
            .get('/assoliments')
            .end(function (err, res) {
                expect(res).to.have.status(400);
                expect(res.text).to.eql('The query parameter is empty');
                done();
            });
    });
    it('should return no content status', (done) => {
        chai.request(url)
            .get('/assoliments?useremail=paula@gmail.com')
            .end(function (err, res) {
                expect(res).to.have.status(204);
                done();
            });
    });
});
