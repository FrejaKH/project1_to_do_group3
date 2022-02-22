var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const TITLE = 'Todo';
const usercontroller = require('../controllers/userController');
var cookieParser = require('cookie-parser')

// app.use(cookieParser())

/* GET users listing.  This is a DUMMY this route is caught in index.js */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET show html form for users */
router.get('/register', async function(req, res, next) {
  let departments = await dep.getDepts({});             // read departments, users work in them
  res.render('register', {
      title: TITLE,
      subtitle: 'Register User',
      departments
    });
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
router.post('/login', function(req, res, next) {
  

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

/* get admin username on page */
router.get('/admin/:username', async function(req, res, next) {
  usercontroller.updateUser(req, res, next, 'active', req.params.username);
  res.redirect('/users/admin'); 
});
/* get admin username on page */
router.get('/admin1/:username', async function(req, res, next) {
  usercontroller.updateUser(req, res, next, 'inactive', req.params.username);
  res.redirect('/users/admin'); 
});

module.exports = router;
