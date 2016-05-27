var express = require('express'),
    fs = require('fs');
var router = express.Router();

// TODO: Switch to API calls like originally planned
var readFile = function(fname) {
  return fs.readFileSync(fname, 'utf8', function(err, data) { return data; });
};

var fileName = 'resume.json';
var fetchData = function(key) {
  return JSON.parse(readFile(fileName))[key];
};

/* Display resume */
router.get('/', function(req, res, next) {
  var data = {
    contact: fetchData('contact'),
    toolbox: fetchData('toolbox'),
    experience: fetchData('experience'),
    activities: fetchData('activities'),
    education: fetchData('education')
  };
  res.render('resume', data);
});

module.exports = router;
