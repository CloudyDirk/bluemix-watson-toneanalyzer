var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

var router = express.Router();
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var tone_analyzer = watson.tone_analyzer(config.watson.tone_analyzer);
router.post('/', urlEncodedParser, function(req, res, next) {
  tone_analyzer.tone({
    text: req.body.text
  }, function(err, tone) {
    if (!err) {
      console.log(JSON.stringify(tone, null, 2));
      res.render('analyze', tone);
    }
  });
});

module.exports = router;
