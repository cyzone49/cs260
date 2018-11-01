var express = require('express');
var router = express.Router();


var request = require("request");
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('weather.html', { root: 'public' });
});

router.get("/getcity", function(req, res, next) {
    // console.log("In getcity");
    var regEx = new RegExp("^" + req.query.q);

    fs.readFile(__dirname + "/cities.dat.txt", function(err, data) {
        if (err) {
            throw (err);
        }

        var results = [];
        var cities = data.toString().split("\n");
        cities.forEach(function(item) {
            var result = item.search(regEx);
            if (result != -1) {
                results.push({ city: item });
            }
        });
        // console.log(results);
        res.status(200).json(results);
    });
});

router.get("/owl", function(req,res,next) {
    var url = "https://owlbot.info/api/v1/dictionary/";
    url += req.query.q;
    url += "?format=json";
    console.log(url);
    request(url).pipe(res);
});

// var owlbot = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
// router.get('/owlbot', function(req,res) {
//   console.log("In owlbot");
//   request(owlbot).pipe(res);
//   res.send(owlbot);
// });

module.exports = router;
