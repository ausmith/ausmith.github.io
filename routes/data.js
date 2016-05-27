var express = require('express');
var fs = require('fs');
var router = express.Router();

// TODO: Cache file data on first load
var readFile = function(fname) {
  return fs.readFileSync(fname, 'utf8', function(err, data) { return data; });
};

var fileName = 'resume.json';
var fetchData = function(key) {
  return JSON.parse(readFile(fileName))[key];
};

/* Activities */
router.get('/activities', function(req, res) {
  res.json(fetchData('activities'));
});

/* Contact */
router.get('/contact', function(req, res) {
  res.json(fetchData('contact'));
});

/* Education */
router.get('/education', function(req, res) {
  res.json(fetchData('education'));
});

/* Experience */
router.get('/experience', function(req, res) {
  res.json(fetchData('experience'));
});

/* Toolbox */
router.get('/toolbox', function(req, res) {
  res.json(fetchData('toolbox'));
});

/* All */
router.get('/', function(req, res) {
  res.json(JSON.parse(readFile(fileName)));
});

module.exports = router;
