const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let userMethods = require("../controllers/methods/user");
let ApiError = require("../middleware/ErrorTypes");

//Require the dev-dependencies
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
 
chai.use(chaiAsPromised);
 

let chaiHttp = require('chai-http');
let server = require('../index');
// Then either:
let expect = chai.expect;
// or:
let assert = chai.assert;
let should = chai.should();

let mongoServer;
const opts = { useNewUrlParser: true, dbName: "verifyMASTER", useCreateIndex: true, useUnifiedTopology: true };

chai.use(chaiHttp);
//Our parent block
describe('User', () => {

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // disconnect from real server running and use mock server instead...idk how to do this better
    await mongoose.disconnect();
    await mongoose.connect(mongoUri, opts);
  });
  
  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

/*
  * Test the /GET route
  */
  describe('/POST register/login', () => {

    it('should register success', async () => {
      const { username, password } = testUser;
      const r = await userMethods.register(username, password);
      r.should.have.property('success').eql(true);
    });

    it('shouldnt register cuz duplicate', async () => {
      userMethods.register(testUser.username, testUser.password).should.eventually.throw(ApiError.UserExistsError);
    });

    it('login failiure', async () => {
      userMethods.login(wrongpass.username, wrongpass.password).should.eventually.throw(ApiError.LoginFailError);
    });

      // it('should register success', (done) => {
      //   chai.request(server)
      //       .post('/user/register')
      //       .send(testUser)
      //       .end((err, res) => {
      //         res.should.have.status(200);
      //         done();
      //       });
      // });

      // it('shouldnt register cuz duplicate', (done) => {
      //   chai.request(server)
      //       .post('/user/register')
      //       .send(testUser)
      //       .end((err, res) => {
      //         res.should.have.status(400);
      //         res.body.should.have.property('message').eql(ApiError.UserExistsError.message);
      //         done();
      //       })
      // });

      it('should be able to login', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(testUser)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

      // it('wrong login', (done) => {
      //   chai.request(server)
      //       .post('/user/login')
      //       .send(wrongpass)
      //       .end((err, res) => {
      //         res.should.have.status(400);
      //         res.body.should.have.property('message').eql(ApiError.LoginFailError.message);
      //         done();
      //       });
      // });
  });

});

const testUser = {
  username: "else",
  password: "hello123"
};

const wrongpass = {
  username: "else",
  password: "hello122"
}