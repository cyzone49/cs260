var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/notesDB',{ useNewUrlParser: true }); 

var noteSchema = mongoose.Schema({
   Title: String,
   Location: String,
   Time : { type : Date, default: Date.now },
   Description: String
});

var Note = mongoose.model('Note', noteSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
   console.log('\nConnected to Database.\n');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/note', function(req, res, next) {
   console.log("\nIn the GET route.....\n");
   Note.find(function(err,noteList) { 
      if (err) return console.error(err);
      else {
         noteList.sort(function(a, b) { 
            return a.Time - b.Time;
         })
         res.json(noteList);
      }
   })
});

router.post('/note', function(req, res, next) {
   console.log("\nPOST note route.....\n");
   console.log(req.body);
   var newnote = new Note(req.body);
   newnote.save(function(err, post) { 
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
   });
});

router.delete('/note', function(req, res, next) {
   console.log("DELETE note route");
   
   Note.find().remove(function(){
      console.log("Deleted database");   
   });
});

router.delete('/note?time=late', function(req, res, next) {
   console.log("DELETE note route... for Late Events");
   // Note.find().remove(function(){
   //    console.log("Deleted database");   
   // });
});

module.exports = router;
