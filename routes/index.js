var express = require('express');
var router = express.Router();
const TITLE = 'Todo';
const controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome', {
        title: TITLE,
        subtitle: 'Welcome'
    });
});

/* GET show departments */
router.get('/departments', async function(req, res, next) {
    let departments = await con.getDepts({}, {sort: {title: 1}});   // read depts from db
    res.render('showdepts', {
        title: TITLE,
        subtitle: 'Display Departments',
        departments
    });
});

// GET page with "Add to do"
router.get('/addtodo', function(req, res, next) {
    res.render('addtodo', {
        title: 'Add To Do',
        user: req.signedCookies.User,
    });
});

// POST handle form data for "Add to do" 
router.post('/addtodo', function(req, res, next) {
    //function from controllers that writes to do into database
    controller.postTodo(req, res, next);                                  
    res.redirect('/');
});


module.exports = router;
