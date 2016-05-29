var express = require('express'),
    fs = require('fs'),
    request = require('request');
var router = express.Router();

var fetchAll = function(host, callback) {
  request.get('http://' + host + '/data', function(err, response, body) {
    if(!err && response.statusCode == 200) {
      return callback(null, JSON.parse(body));
    } else if(!err && response.statusCode != 200) {
      return callback({ message: 'Bad response' });
    } else {
      return callback(err);
    }
  });
};

// GET /resume
router.get('/', function(req, res, next) {
  fetchAll(req.get('host'), function(err, data) {
    if(err) return next(err);
    res.render('resume', data);
  });
});

module.exports = router;
