'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var firebaseAdmin = require('firebase-admin');

var firebaseDB = firebaseAdmin.database();

chai.use(chaiHttp);
const url= 'http://localhost:3000';

//Crec que s'hauria de fer POST CrearIndividual amb els email ordenats, sense els emails ordenats, amb emails iguals
describe('/POST CrearIndividual:', () => {
    before(function(done){

        done();
    });
    after(function(done){
        //delete en firebase
        done();
    });
    it('should update the user', (done) => {
        chai.request(url)
            .post('/xats/individual')
            .send({email1:'carme@gmail.com', email2:'lluis@gmail.com'})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('Creat');
                done();
            });
    });
    it('error X', (done) => {
        chai.request(url)
            .post('/xats/individual')
            .send({email1:'cambiar@gmail.com', email2:'cambiar@gmail.com'})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('User Not Found');
                done();
            });
    });
    it('error Y', (done) => {
        chai.request(url)
            .post('/xats/individual')
            .send({email1:'cambiar@gmail.com', email2:'cambiar@gmail.com'})
            .end(function(err,res) {
                expect(res).to.have.status(500);
                expect(res.text).to.eql('This username is already in use');
                done();
            });
    });
});

describe('/POST enviarMsg', () => {
    let email1 = req.body.email1
    let email2 = req.body.email2
    var emailAux
    if(email1 > email2){
        emailAux = email2.concat(email1)
    }else if(email1 < email2){
        emailAux = email1.concat(email2)
    }
    const data = {

        email: req.body.email,
        message: req.body.message
    };

    before(function(done){

        firebaseDB.ref(emailAux).push(data)
        done();
    });
    after(function(done){
        //es borra tota la taula, no se com borrar sol un missatge
        let borrar = this.firebaseDB.ref(emailAux)
        borrar.remove()
        done();
    });
    it('should send the message', (done) => {
        chai.request(url)
            .post('/xats/missatgesIndividual')
            .send({email1:'josep@gmail.com',email2: 'pilar@gmail.com',email:'josep@gmail.com',message:'hola'})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('Enviat');
                done();
            });
    });
    it('emails iguals', (done) => {
        chai.request(url)
            .post('/users/josep/create')
            .send({email1:'josep@gmail.com',email2: 'josep@gmail.com',email:'josep@gmail.com',message:'hola'})
            .end(function(err,res) {
                expect(res).to.have.status(500);
                expect(res.text).to.eql('Emails iguals');
                done();
            });
    });
});
