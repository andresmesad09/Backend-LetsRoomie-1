let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const server = require('../src/server');
const config = require("../src/config");
const db = require('../src/components/db/db');

db(config.dbUrl);

//Generate a random id to create a email.
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


describe('Users routes: ', () => {
  it('shouldn´t create an user', (done) => {
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
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should create an user', (done) => {
    chai
      .request(server)
      .post('/createUser')
      .send({
        email: `${makeid(6)}@test.com`,
        password: 'unacontraseña',
        phone: '+57 3002040948',
        name: 'test data',
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

  it('shouldn´t create an user due to no user send', (done) => {
    chai
      .request(server)
      .post('/createUser')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });


  it('Shouldn´t delete an user due to no id', (done) => {
    chai
      .request(server)
      .delete('/users/')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(404);
        done();
      });
  })

  it('Shouldn´t delete an user', (done) => {
    chai
      .request(server)
      .delete('/users/5f6beff49571bf2deed1d25c')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  })


  it('should get hosts', (done) => {
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

  it('should get user by Id', (done) => {
    chai
      .request(server)
      .get('/users?_id=5f73fc3e784ab646500eaccf')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get user by email', (done) => {
    chai
      .request(server)
      .get('/user/test@test.com')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get user by email', (done) => {
    chai
      .request(server)
      .get('/user/test@test.com')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should Login a user and got an object', (done) => {
    chai
      .request(server)
      .post('/signin')
      .send({
        email: 'test8@test.com',
        password: 'unacontraseña',
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object')
        done();
      });
  });

  it('shouldn´t Login due to invalid password', (done) => {
    chai
      .request(server)
      .post('/signin')
      .send({
        email: 'test8@test.com',
        password: 'unacontrase',
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(500);
        expect(res.body).to.be.a('object')
        done();
      });
  });

  it('shouldn´t Login due to no data', (done) => {
    chai
      .request(server)
      .post('/signin')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(500);
        done();
      });
  });


  it('should get Mail link', (done) => {
    chai
      .request(server)
      .get('/contact-mail?_id=5f740c395ec7c746fc4fbb59')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('shouldn´t get Mail link due to invalid id', (done) => {
    chai
      .request(server)
      .get('/contact-mail?_id=5f740c395ec7c746fc7fbb58')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should get Whatsapp link', (done) => {
    chai
      .request(server)
      .get('/contact-wapp?_id=5f740c395ec7c746fc4fbb59')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('shouldn´t get Whatsapp link due to invalid id', (done) => {
    chai
      .request(server)
      .get('/contact-wapp?_id=7f740c395ec7c746fc3fbb59')
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });

});

/*
Favorite routes
*/
describe("Favorites routes", () => {
  it('shouldn´t get favorites because there is no token ', (done) => {
    chai
      .request(server)
      .get('/fav')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('shouldn´t get favorites because there is an invalid token', (done) => {
    chai
      .request(server)
      .get('/fav')
      .set('access-token', 'aasd8t23bjkasdgyasjh')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('shouldn´t get favorite by Id because there is no token ', (done) => {
    chai
      .request(server)
      .get('/fav/5f7555fd70e3f9379c26e0dc')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('shouldn´t delete favorite by Id because there is no token ', (done) => {
    chai
      .request(server)
      .delete('/fav/5f7555fd70e3f9379c26e0dc')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('shouldn´t get favorites from a user by Id because there is no token ', (done) => {
    chai
      .request(server)
      .get('/fav?user=5f740c395ec7c746fc4fbb59')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should get favorites from a city', (done) => {
    chai
      .request(server)
      .get('/fav/place/5f6d3de10948e7266410ac71')
      .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
  });
})

describe("Places routes", () => {
  it('should get all the places', (done) => {
    chai
      .request(server)
      .get('/place')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get all the available places', (done) => {
    chai
      .request(server)
      .get('/place')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get one place', (done) => {
    chai
      .request(server)
      .get('/place/5f753d54f8a90e433494fb69')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should get place from a city', (done) => {
    chai
      .request(server)
      .get('/placec/Bogotá')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
})

describe("AWS routes", () => {
  it('Shouldn´t attach a file in aws s3 - no file', (done) => {
    chai
      .request(server)
      .post('/api/profile/avatarUpload')
      .end(function (err, res) {
        expect(res).to.have.status(500);
        done();
      });
  });

  it('Shouldn´t attach a file in aws s3 - no file', (done) => {
    chai
      .request(server)
      .post('/api/profile/multipleUpload')
      .end(function (err, res) {
        expect(res).to.have.status(500);
        done();
      });
  });
})