var expect = require('chai').expect,
    request = require('supertest');

var testForExpectedKeys = function(expectedKeys, obj) {
  var actualKeys = [];
  for(var k in obj) {
    if(expectedKeys.indexOf(k) < 0) throw new Error('unexpected key ' + k);
    actualKeys.push(k);
  };
  for(var k in expectedKeys) {
    if(actualKeys.indexOf(expectedKeys[k]) < 0) throw new Error('missing key ' + expectedKeys[k]);
  };
};

describe('Data API', function() {
  var server;

  beforeEach(function() {
    server = require('../app');
  });

  afterEach(function() {
    server.close;
  });

  describe('/', function() {
    it('returns the entire contents of the file', function testData(done) {
      request(server)
        .get('/data')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['activities', 'contact', 'education', 'experience', 'toolbox'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/activities', function() {
    it('returns just the activities section of the file', function testDataActivities(done) {
      request(server)
        .get('/data/activities')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['college', 'other'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/contact', function() {
    it('returns just the contact section of the file', function testDataContact(done) {
      request(server)
        .get('/data/contact')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['email', 'name'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/education', function() {
    it('returns just the education section of the file', function testDataEducation(done) {
      request(server)
        .get('/data/education')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['college', 'highschool'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/experience', function() {
    it('returns just the experience section of the file', function testDataExperience(done) {
      request(server)
        .get('/data/experience')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['careerbuilder', 'govdelivery', 'damballa'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/toolbox', function() {
    it('returns just the toolbox section of the file', function testDataToolbox(done) {
      request(server)
        .get('/data/toolbox')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var expectedKeys = ['languages', 'databases', 'systems', 'configuration'];
          testForExpectedKeys(expectedKeys, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });
});
