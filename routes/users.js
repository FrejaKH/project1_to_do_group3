var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const TITLE = 'Todo';
const usercontroller = require('../controllers/userController');
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');

/* GET users listing.  This is a DUMMY this route is caught in index.js */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', {
        title: TITLE,
        subtitle: 'Signup'
    });
});
/* Post signup page */
router.post('/signup', function(req, res, next) {
  usercontroller.postNewUser(req, res, next);                         // write user into db
  res.redirect('/users/login');                                    // go to login page
});
/* GET signup page */
router.get('/login', function(req, res, next) {
  res.render('login', {
        title: TITLE,
        subtitle: 'Login'
    });
});
/* post signup page */
router.post('/login', async function(req, res, next) {
  // console.log("worked");
  // console.log(req.body.password);
  // console.log(req.body.username);
  let users = await usercontroller.getUser({username: req.body.username});             // read users.
  if(users.length >= 1 && await bcrypt.compare(req.body.password, ''+users[0].password) && users[0].status == "active"){
    console.log("log in worked");
    res.cookie('User', users[0].username + '', { signed : true, maxAge: 1000*60*60*24*7 });
    res.render('addtodo', {
      title: TITLE,
      subtitle: 'addtodo'
  }); 
  }else{
    console.log("not logged in");
    res.render('login', {
      title: TITLE,
      subtitle: 'Login'
  }); 
  }                                 // go to login page
});

/* GET logout page */
router.get('/logout', function(req, res, next) {
  console.log("worked");
  res.cookie('User','', { signed : true, maxAge: 0 });
  res.render('login', {
        title: TITLE,
        subtitle: 'Login'
    });
});

/* GET signup page */
router.get('/admin', async function(req, res, next) {
  let users = await usercontroller.getUser({});             // read users.
  res.render('admin', {
        title: TITLE,
        subtitle: 'Activate/Deactivate users',
        users
    });
});

/* GET admin username on page */
router.get('/admin/:username', async function(req, res, next) {
  usercontroller.updateUser(req, res, next, 'active', req.params.username);
  res.redirect('/users/admin'); 
});
/* GET admin username on page */
router.get('/admin1/:username', async function(req, res, next) {
  usercontroller.updateUser(req, res, next, 'inactive', req.params.username);
  res.redirect('/users/admin'); 
});

module.exports = router;
