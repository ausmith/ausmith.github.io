var express = require('express'),
    request = require('request');
var router = express.Router();

var fetchData = function(host, callback) {
  request.get('http://' + host + '/resume.json', function(err, response, body) {
    if(!err && response.statusCode == 200) {
      return callback(null, JSON.parse(body));
    } else if(!err && response.statusCode != 200) {
      return callback({ message: 'Bad response' });
    } else {
      return callback(err);
    }
  });
};

var fileName = 'resume.json';
var resume = {};
router.use(function (req, res, next) {
  fetchData(req.get('host'), function(err, data) {
    if(err) return next(err);
    resume = data;
    next();
  });
});

// GET /data
router.get('/', function(req, res) {
  res.json(resume);
});

// GET /data/:k1
router.get('/:k1', function(req, res, next) {
  var k1 = req.params.k1;
  if(resume[k1] == undefined || resume[k1] == null) next('route');
  else next();
}, function(req, res) {
  res.json(resume[req.params.k1]);
});

// GET /data/:k1/:k2
router.get('/:k1/:k2', function(req, res, next) {
  var k1 = req.params.k1,
      k2 = req.params.k2;
  if(resume[k1] == undefined || resume[k1] == null) next('route');
  else if(resume[k1][k2] == undefined || resume[k1][k2] == null) next('route');
  else next();
}, function(req, res) {
  res.json(resume[req.params.k1][req.params.k2]);
});

// GET /data/:k1/:k2/:k3
router.get('/:k1/:k2/:k3', function(req, res, next) {
  var k1 = req.params.k1,
      k2 = req.params.k2,
      k3 = req.params.k3;
  if(resume[k1] == undefined || resume[k1] == null) next('route');
  else if(resume[k1][k2] == undefined || resume[k1][k2] == null) next('route');
  else if(resume[k1][k2][k3] == undefined || resume[k1][k2][k3] == null) next('route');
  else next();
}, function(req, res) {
  res.json(resume[req.params.k1][req.params.k2][req.params.k3]);
});

module.exports = router;
