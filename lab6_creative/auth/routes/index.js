var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("\n[ index.js ] / Route");
    // console.log("~~printing session:");
    // console.log(req.session);
    
    if (req.session.user) {
      // console.log("/ Route if user");
      // console.log(("\nPrinting user:"));
      // console.log(req.session.user);
      
      let curr_notes = req.session.notes;
      
      console.log("\n\nPrinting notes:");
      console.log(curr_notes)
      
      if ( curr_notes === undefined ) {
        console.log("~~~ Nothing in notes yet! ~~~")
      } else {
        if ( curr_notes.length != 0 ) {
          console.log("~~~ Printing note titles: ~~~");
          curr_notes.forEach( function( note ) {
            console.log("\ttitle: " + note.Title + " .... ");
          } );
        }
      }
      
      res.render('index', { username: req.session.username,
                            msg:      req.session.msg,
                            age:      req.session.age,
                            notes:    req.session.notes
                          });
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});


router.get('/user', function(req, res){
    console.log("[ index.js ] /user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("\n[ index.js ] /signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("\n[ index.js ] /login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("\n[ index.js ] /logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;