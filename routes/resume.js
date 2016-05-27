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
      return callback(parsed);
    });
  });
};

/* Display resume */
router.get('/', function(req, res, next) {
  // TODO: make callback take an error node first
  fetchAll(function(data) {
    res.render('resume', data);
  });
});

module.exports = router;
