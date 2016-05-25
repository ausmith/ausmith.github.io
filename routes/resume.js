var express = require('express');
var router = express.Router();

/* Display resume */
router.get('/', function(req, res, next) {
  res.send('final data here');
});

module.exports = router;
