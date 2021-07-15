//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

var userMethods = require("../controllers/methods/user");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('User', () => {

/*
  * Test the /GET route
  */
  describe('/POST register/login', () => {
      it('should register success', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(testUser)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

      it('shouldnt register cuz duplicate', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(testUser)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            })
      });

      it('should be able to login', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(testUser)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });
  });

});

const testUser = {
      username: "else",
      password: "hello123"
  };