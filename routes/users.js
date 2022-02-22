var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const TITLE = 'Todo';
const usercontroller = require('../controllers/userController');

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
/* Post signup page for new user */
router.post('/signup', function(req, res, next) {
  usercontroller.postNewUser(req, res, next);                         // write user into db
  res.redirect('/users/login');                                    // go to login page
});
/* GET login page */
router.get('/login', function(req, res, next) {
  // check if there is a cookie. if it´s empty login otherwise go to addtodo page.
  // console.log('Signed Cookies: ', req.signedCookies.User);
  if(typeof(req.signedCookies.User) === "undefined"){
  res.render('login', {
        title: TITLE,
        subtitle: 'Login'
    });
  }else{
    res.render('addtodo', {
      title: TITLE,
      subtitle: 'addtodo'
  });
  }
}); 
/* post login page for log in */
router.post('/login', async function(req, res, next) {
  console.log(req.signedCookies.User);
  // get all users.
  let users = await usercontroller.getUser({username: req.body.username});
  if(users.length < 1){
    res.render('login', {
      title: TITLE,
      subtitle: 'Login',
      error: 'Account dosen´t exsist',
  }); 
  }else{
  if(users[0].status == "adminactive" && await bcrypt.compare(req.body.password, ''+users[0].password)){
    res.cookie('User', users[0].username + '', { signed : true, maxAge: 1000*60*60*24*7 });
    res.render('addtodo', {
      title: TITLE,
      subtitle: 'addtodo'
  }); 
  }else{
    if(users.length >= 1 && await bcrypt.compare(req.body.password, ''+users[0].password) && users[0].status == "active"){
      res.cookie('User', users[0].username + '', { signed : true, maxAge: 1000*60*60*24*7 });
      res.render('addtodo', {
        title: TITLE,
        subtitle: 'addtodo'
    }); 
    }else{
      res.render('login', {
        title: TITLE,
        subtitle: 'Login',
        error: 'Username or Password are wrong.',
    }); 
    }
  }  
}          
});

/* GET logout page for resetting user cookies and reference the user to log in page. */
router.get('/logout', function(req, res, next) {
  res.cookie('User','', { signed : true, maxAge: 0 });
  res.render('login', {
        title: TITLE,
        subtitle: 'Login'
    });
});

/* GET admin page only for admin */
router.get('/admin', async function(req, res, next) {
  // check if the user is admin.
  if(req.signedCookies.User === "zantex94" ){
  let users = await usercontroller.getUser({});             // read users.
  res.render('admin', {
        title: TITLE,
        subtitle: 'Activate/Deactivate users',
        users
    });
  }else{
    res.render('login', {
      title: TITLE,
      subtitle: 'Login'
  });
  }
});

/* GET admin username for activating a user in the system. */
router.get('/admin/:username', async function(req, res, next) {
  if(req.signedCookies.User === "zantex94" ){
  usercontroller.updateUser(req, res, next, 'active', req.params.username);
  res.redirect('/users/admin'); 
}else{
  res.render('login', {
    title: TITLE,
    subtitle: 'Login'
});
} 
});
/* GET admin username for deactivating a user in the system. */
router.get('/admin1/:username', async function(req, res, next) {
  if(req.signedCookies.User === "zantex94" ){
    usercontroller.updateUser(req, res, next, 'inactive', req.params.username);
    res.redirect('/users/admin'); 
  }else{
    res.render('login', {
      title: TITLE,
      subtitle: 'Login'
  });
  } 
});

module.exports = router;
