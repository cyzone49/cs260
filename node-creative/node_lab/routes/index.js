var express = require('express');
var router = express.Router();

// var request = require("request");
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
    console.log("sending file over");
    res.sendFile('calc.html', { root: 'public' });
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
