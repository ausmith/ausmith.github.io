var expect = require('chai').expect,
    request = require('supertest');

var testExpectedObjectStructure = function(expectedObj, obj) {
  var actualKeys = Object.keys(obj);
  var expectedKeys = Object.keys(expectedObj);
  for(var k in obj) {
    if(expectedKeys.indexOf(k) < 0) throw new Error('unexpected key ' + k);
  };
  for(var k in expectedKeys) {
    if(actualKeys.indexOf(expectedKeys[k]) < 0) throw new Error('missing key ' + expectedKeys[k]);
    if(typeof obj[expectedKeys[k]] != typeof expectedObj[expectedKeys[k]]) throw new Error(typeof obj[expectedKeys[k]] + ' != ' + typeof expectedObj[expectedKeys[k]]);
  };
};

describe('Data API', function() {
  var server;
  var expectedStructure = {
    contact: { name: '', email: '', website: '' },
    education: { college: { name: '', degree: '', subject: '', date: '', jobs: {} } },
    experience: {
      careerbuilder: { name: '', location: '', dates: '', technologies: [], titles: {} },
      govdelivery: { name: '', location: '', dates: '', technologies: [], titles: {} },
      damballa: { name: '', location: '', dates: '', technologies: [], titles: {} }
    },
    toolbox: { languages: [], databases: [], systems: [], configuration: [] }
  };

  beforeEach(function() {
    server = require('../app');
  });

  afterEach(function() {
    server.close;
  });

  describe('/data', function() {
    it('returns the entire contents of the file', function testData(done) {
      request(server)
        .get('/data')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure, res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/contact', function() {
    it('returns just the contact section of the file', function testDataContact(done) {
      request(server)
        .get('/data/contact')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure['contact'], res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/education', function() {
    it('returns just the education section of the file', function testDataEducation(done) {
      request(server)
        .get('/data/education')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure['education'], res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/experience', function() {
    it('returns just the experience section of the file', function testDataExperience(done) {
      request(server)
        .get('/data/experience')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure['experience'], res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/toolbox', function() {
    it('returns just the toolbox section of the file', function testDataToolbox(done) {
      request(server)
        .get('/data/toolbox')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure['toolbox'], res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/education/college', function() {
    it('returns just the education/college section of the file', function testDataToolbox(done) {
      request(server)
        .get('/data/education/college')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          testExpectedObjectStructure(expectedStructure['education']['college'], res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/education/college/name', function() {
    it('returns just the education/college/name section of the file', function testDataToolbox(done) {
      request(server)
        .get('/data/education/college/name')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function(res) {
          var val = expectedStructure['education']['college']['name'];
          if(typeof val != typeof res.body) throw new Error(typeof val + ' != ' + typeof res.body);
        })
        .expect('Content-Type', /json/, done);
    });
  });

  describe('/data/badkey', function() {
    it('get 404 with bad route', function testDataToolbox(done) {
      request(server)
        .get('/data/badkey')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });
});
