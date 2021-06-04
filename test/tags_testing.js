'use strict'


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var db = require('../database.js');

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('/GET TagsxUsuari:', () => {
    before(function(done){
        db.serialize(() => {
            let sql = 'SELECT * ' +
                'FROM TagsxUsuari tu ' +
                'WHERE LOWER(tu.Usuari) = LOWER(?)'
            db.run(sql,['test28@gmail.com'], () => {
                done();
            });
        });
    });
    after(function(done){
        done();
    });
    it('should send tags', (done) => {
        chai.request(url)
            .get('/tags/test28@gmail.com/show')
            .end(function(err,res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('/POST and DELETE Tags:', () => {
    before(function(done){
        db.serialize(() => {
            let sql = 'INSERT INTO TagsxUsuari VALUES (?,?);';
            db.run(sql,['TagTest','marianievas11'], () => {
                done();
            });
        });
    });
    after(function(done){
        let sql = 'DELETE FROM TagsxUsuari WHERE LOWER(nomTag) = LOWER(?) AND LOWER(Usuari) = LOWER(?);';
        db.run(sql,['TagTest','marianievas11@gmail.com'], () => {
            done();
        });
        done();
    });
    it('should add the tag', (done) => {
        chai.request(url)
            .post('/tags/marianievas11@gmail.com/insert')
            .send({nomTag:'TagTest'})
            .end(function(err,res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});