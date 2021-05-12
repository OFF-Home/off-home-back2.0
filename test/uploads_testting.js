'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');
var fs = require('fs');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/POST uploadImage', () => {
    before(function(done){
        let sql = 'INSERT INTO Usuaris (email,username,password,image) VALUES (?,?,?,?)';
        db.run(sql,['jose@gmail.com','jose','2365','./images/image_for_testing2.jpg']);
        sql = 'INSERT INTO Usuaris (email,username,password) VALUES (?,?,?)';
        db.run(sql,['pep@gmail.com','pep','0685488']);
        fs.copyFileSync(`${__dirname}/image_for_testing2.jpg`,`${__dirname}/../images/image_for_testing2.jpg`);
        done();
    });
    after(function(done){
        let sql= 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql,['jose']);
        db.run(sql,['pep']);
        fs.unlinkSync(`${__dirname}/../images/image_for_testing.jpg`);
        fs.unlinkSync(`${__dirname}/../images/image_for_testing3.jpg`);
        done();
    });
    it('should insert the image of the user', (done) => {
        chai.request(url)
            .post('/upload/userimage/pep@gmail.com')
            .attach('file',fs.readFileSync(`${__dirname}/image_for_testing.jpg`),
                'image_for_testing.jpg')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('OK');
                done();
            });
    });
    it('should try to insert the same image that the user have', (done) => {
        chai.request(url)
            .post('/upload/userimage/jose@gmail.com')
            .attach('file',fs.readFileSync(`${__dirname}/image_for_testing2.jpg`),
                'image_for_testing2.jpg')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('OK');
                done();
            });
    });
    it('should update the image of the user', (done) => {
        chai.request(url)
            .post('/upload/userimage/jose@gmail.com')
            .attach('file',fs.readFileSync(`${__dirname}/image_for_testing3.jpg`),
                'image_for_testing3.jpg')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                expect(res.text).to.eql('OK');
                done();
            });
    });
});

describe('/GET getImageUser', () => {
    before(function (done) {
        let sql = 'INSERT INTO Usuaris (email,username,password,image) VALUES (?,?,?,?)';
        db.run(sql, ['joel@gmail.com', 'joel', '2365', './images/image_for_testing4.jpg']);
        fs.copyFileSync(`${__dirname}/image_for_testing4.jpg`, `${__dirname}/../images/image_for_testing4.jpg`);
        done();
    });
    after(function (done) {
        let sql = 'DELETE FROM Usuaris WHERE username = ?;';
        db.run(sql, ['joel']);
        fs.unlinkSync(`${__dirname}/../images/image_for_testing4.jpg`);
        done();
    });
    it('should return the image of ther user', (done) => {
        chai.request(url)
            .get('/upload/userimageget/joel')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.header['content-type']).to.have.string('image/jpeg');
                done();
            });
    });
    it('should return user not found', (done) => {
        chai.request(url)
            .get('/upload/userimageget/joeeeee')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });
});