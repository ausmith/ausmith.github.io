var express = require('express'),
    fs = require('fs'),
    http = require('http');
var router = express.Router();

var fetchAll = function(callback) {
  http.get({
    host: 'localhost',
    port: 3000,
    path: '/data'
  }, function(response) {
    var body = '';
    response.on('data', function(d) { body += d; });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      return callback(null, parsed);
    });
    response.on('error', function(err) {
      return callback(err);
    });
  });
};

// GET /resume
router.get('/', function(req, res, next) {
  fetchAll(function(err, data) {
    if(err) return next(err);
    res.render('resume', data);
  });
});

module.exports = router;
