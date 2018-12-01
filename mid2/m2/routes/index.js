var express  = require('express');
var router   = express.Router();
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/candidateDB',{ useNewUrlParser: true }); 

var VotingSchema = new mongoose.Schema( {
    Name: {
        type: String,
        require: true,
        unique: true
    },
    Votes: {type:Number, default: 0}
});

VotingSchema.methods.upvote = function(cb) {
  this.Votes += 1;
  this.save(cb);
};

var Voting = mongoose.model('Voting', VotingSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
   console.log('\nConnected to Database.\n');
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    // res.sendFile('admin.html', { root: 'public' });
});

// #################################

router.param('candidate', function(req, res, next, id) {
    console.log("\nPARAM--- !~-----~! ..... ");
    var query = Voting.findById(id);
  
    query.exec(function (err, candidate){
        if (err) { return next(err); }
        if (!candidate) { return next(new Error("can't find candidate")); }
        req.candidate = candidate;
        return next();
    });
});

// router.get('/voting/:candidate',function(req,res) {
//   res.json(req.candidate);
// });

router.put('/voting/:candidate/upvote', function(req, res, next) {
    console.log("\nPUT --- !~-----~! ..... "+req.candidate.Name);
    console.log(req);
    console.log(req.body);
    
    // let values = req.body;
    // var user_id = req.params.user_id;
    // Voting.update({user_id: user_id}, values, function(err, values) {
    //     if (!err) {
    //         res.json("okay");
    //     } else {
    //         res.write("fail");
    //     }
    // });
    req.candidate.upvote(function(err, candidate) {
        if (err) { return next(err); }
        res.json(candidate);
    });
});

// router.delete('/voting/:candidate',function(req,res) {
//   req.candidate.remove();
//   res.sendStatus(200);
// });


// #################################


router.get('/voting', function(req, res, next) {
    console.log("\nGET --- !~admin~! .....\n");
    // let candidate = new Voting(req.body);
    Voting.find( function(err, candidatesList ) {
        if (err) return console.error(err);
        else {
            // candidatesList.sort(function(a, b) { 
            //     return a.Votes - b.Votes;
            // });
            res.json(candidatesList);
            console.log("\t~~noError - candidatesList - GET route");
        }
    });
});

router.get('/voting/:candidate',function(req,res) {
  res.json(req.candidate);
});

router.post('/voting', function(req, res, next) {
  console.log("\nPOST --- !~admin~! .....\n");
  console.log(req.body);
  var newobj = new Voting(req.body);
  newobj.save(function(err, post) { 
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
  });
});

router.delete('/voting', function(req, res, next) {
  console.log("\nDELETE --- !~admin~! .....\n");
  Voting.find().remove(function(){
      console.log("Deleted database");
  });
});

router.delete('/voting/:candidate',function(req,res) {
    req.candidate.remove();
    res.sendStatus(200);
});


module.exports = router;
