const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Translation = require('../models/translation.js');

chai.use(chaiHttp);

const sampleTranslation = {
    "word": "fish",
    "trans": "baliq",
    "synonym": "none"
}
describe('Translations', ()  => {

  // TEST INDEX
  it('should index ALL translation on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  // TEST NEW
  it('should display new form on /translations/new GET', (done) => {
      chai.request(server)
          .get(`/translations/new`)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
  });

  // TEST SHOW
  it('should show a SINGLE translation on /translations/<id> GET', (done) => {
      var translation = new Translation(sampleTranslation);
      translation.save((err, data) => {
          chai.request(server)
              .get(`/translations/${data._id}`)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.html
                  done();
              });
      });
  });


  // TEST EDIT
  it('should edit a SINGLE translation on /translations/<id>/edit GET', (done) => {
      var translation = new Translation(sampleTranslation);
      translation.save((err, data) => {
          chai.request(server)
              .get(`/translations/${data._id}/edit`)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.html
                  done();
              });
      });
  });

  // TEST CREATE
  it('should create a SINGLE translation on /translations POST', (done) => {
      chai.request(server)
          .post('/translations')
          .send(sampleTranslation)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
  });

  // TEST UPDATE
  it('should update a SINGLE translation on /translations/<id> PUT', (done) => {
      var translation = new Translation(sampleTranslation);
      translation.save((err, data) => {
          chai.request(server)
              .put(`/translations/${data._id}?_method=PUT`)
              .send({
                  'title': 'Updating the title'
              })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.html
                  done();
              });
      });
  });

  // TEST UPDATE
  it('should update a SINGLE translation on /translations/<id> PUT', (done) => {
      var translation = new Translation(sampleTranslation);
      translation.save((err, data) => {
          chai.request(server)
              .put(`/translations/${data._id}?_method=PUT`)
              .send({
                  'title': 'Updating the title'
              })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.html
                  done();
              });
      });
  });
  
});