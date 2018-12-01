var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/m2RedoDB',{ useNewUrlParser: true }); 

var VotingSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    votes: {
        type: Number,
        default: 0
    }
})

var Voting = mongoose.model('Voting', VotingSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
   console.log('\nConnected to Database.\n');
});

router.param('candidate', function(req, res, next, id) {
  var query = Voting.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});

router.get('/voting/:candidate',function(req,res) {
  res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next) {
  console.log("\n\nPut Route: -- name = "+req.candidate.Name);
//   console.log("~~req: " + typeof(req) + " == " + req.body);
//   console.log("~~req.candidate: " + typeof(req.candidate) + " == " + req.candidate);
  //candidate: is the actual candidate object
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});

router.delete('/voting/:candidate',function(req,res) {
  req.candidate.remove();
  res.sendStatus(200);
});

router.get('/voting', function(req, res, next) {
  console.log("Get Route");
  Voting.find(function(err, candidates){
    if(err){ console.log("Error"); return next(err); }
    res.json(candidates);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/voting', function(req, res, next) {
  console.log("\n\nPost Route");
  var candidate = new Voting(req.body);
  console.log(candidate);
  candidate.save(function(err, candidate){
		console.log("Error "+err);
		if(err) return next(err);
        console.log("Post Route before json");
		res.json(candidate);
	});
});

module.exports = router;
