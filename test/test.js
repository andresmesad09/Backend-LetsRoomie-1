let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const server = require('../src/server');
const config = require("../src/config");
const db = require('../src/components/db/db');

db(config.dbUrl);


describe('Users routes: ', () => {
  it('should create an user', (done) => {
    chai
      .request(server)
      .post('/createUser')
      .send({
        email: 'test8@test.com',
        password: 'unacontraseña',
        phone: '+57 3002040948',
        name: 'test8 data',
        avatar: 'https://letsroomie.s3.us-east-2.amazonaws.com/defualtImage-1601429025283.png',
        isHost: false,
        about: 'this is a test'
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should get host', (done) => {
    chai
      .request(server)
      .get('/ishost')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get users', (done) => {
    chai
      .request(server)
      .get('/users')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get users', (done) => {
    chai
      .request(server)
      .get('/users?_id=5f73fc3e784ab646500eaccf')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get users', (done) => {
    chai
      .request(server)
      .get('/user/test@test.com')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

});
