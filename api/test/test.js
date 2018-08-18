// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let server = require('../server');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const API_URL = process.env.API_URL || `http://0.0.0.0:3200/api`;

// Our parent block
describe('API Tests: ', () => {
  it('Bad endpoint gets 404', done => {
    chai.request(API_URL).get('/ping').end( (err, res) => {
      res.should.have.status(404);
      done();
    })
  });

  it('Database is initialized', done => {
    chai.request(API_URL).delete('/notes').end( (err, res) => {
      res.should.have.status(200);
      done();
    });
  });


  it('Database has no rows', done => {
    chai.request(API_URL).get('/notes').end( (err, res) => {
      const notes = res.body;

      res.should.have.status(200);
      notes.should.be.a('array');
      notes.length.should.be.eql(0, 'Database does not have zero rows');

      done();
    });
  });


  it('Insert a note', done => {
    chai.request(API_URL).put('/notes').send({ id: 1, title: 'aaaa', text: 'bbbb'}).end( (err, res) => {

      res.should.have.status(200);

      chai.request(API_URL).get('/notes').end( (err, res) => {
        const notes = res.body;
        res.should.have.status(200);
        notes.should.be.a('array');
        notes.length.should.be.eql(1, 'Database does not have one row');
        done();
      });
    });
  });

  it('Insert a second note', done => {
    chai.request(API_URL).put('/notes').send({ id: 2, title: 'cccc', text: 'ddddd'}).end( (err, res) => {

      res.should.have.status(200);

      chai.request(API_URL).get('/notes').end( (err, res) => {
        const notes = res.body;
        res.should.have.status(200);
        notes.should.be.a('array');
        notes.length.should.be.eql(2, 'Database does not have two rows');
        done();
      });
    });
  });

  it('Delete first note', done => {
    chai.request(API_URL).delete('/notes/1').end( (err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('Database has one rows', done => {
    chai.request(API_URL).get('/notes').end( (err, res) => {
      const notes = res.body;

      res.should.have.status(200);
      notes.should.be.a('array');
      notes.length.should.be.eql(1, 'Database does not have one row');

      done();
    });
  });

  it('Database is initialized', done => {
    chai.request(API_URL).delete('/notes').end( (err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('Database has no rows', done => {
    chai.request(API_URL).get('/notes').end( (err, res) => {
      const notes = res.body;

      res.should.have.status(200);
      notes.should.be.a('array');
      notes.length.should.be.eql(0, 'Database does not have zero rows');

      done();
    });
  });

});