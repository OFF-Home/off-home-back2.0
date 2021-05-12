'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/PUT UpdateUsuari:', () => {
    before(function(done){
        let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        db.run(sql,['josep@gmail.com','josep','2365']);
        db.run(sql,['pep@gmail.com','pep','3456']);
        done();
    });
    after(function(done){
        let sql= 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql,['josep']);
        db.run(sql,['pep']);
        done();
    });
    it('should update the user', (done) => {
        chai.request(url)
            .put('/users/josep@gmail.com/update')
            .send({followers:600, description:'funciona'})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('User has been updated');
                done();
            });
    });
    it('should not found the user', (done) => {
        chai.request(url)
            .put('/users/vict/update')
            .send({followers:600, description: 'funciona'})
            .end(function(err,res) {
                expect(res).to.have.status(404);
                expect(res.text).to.eql('User Not Found');
                done();
            });
    });
    it('should can not update the user', (done) => {
        chai.request(url)
            .put('/users/josep@gmail.com/update')
            .send({username:'pep'})
            .end(function(err,res) {
                expect(res).to.have.status(500);
                expect(res.text).to.eql('This username is already in use');
                done();
            });
    });
});

describe('/POST registrarUsuari', () => {
    after(function(done) {
        let sql= 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql,['josep']);
        done();
    });
    it('should insert the user', (done) => {
        chai.request(url)
            .post('/users/josep/create')
            .send({email:'josep@gmail.com',password: '634563'})
            .end(function(err,res) {
                expect(res).to.have.status(201);
                expect(res.text).to.eql('OK');
                done();
            });
    });
    it('should can not insert the user', (done) => {
        chai.request(url)
            .post('/users/josep/create')
            .send({email:'josep@gmail.com',password: '634563'})
            .end(function(err,res) {
                expect(res).to.have.status(500);
                expect(res.text).to.eql('This username is already in use');
                done();
            });
    });
});

describe('/GET show info Usuari', () => {
    before(function(done){
        let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        db.run(sql,['ruben@gmail.com','ruben','2365']);
        done();
    });
    after(function(done){
        let sql= 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql,['ruben']);
        done();
    });
    it('should return a json with the info of the user', (done) => {
        chai.request(url)
            .get('/users/ruben@gmail.com/show')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email');
                done();
            });
    });
    it('should not found the user', (done) => {
        chai.request(url)
            .get('/users/usuariinventat/show')
            .end(function(err,res) {
                expect(res).to.have.status(404);
                expect(res.text).to.eql('User not found');
                done();
            });
    });
});