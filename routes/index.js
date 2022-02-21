var express = require('express');
var router = express.Router();
const TITLE = 'Employee Pattern Project';
const controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
    });
});

// GET page with "Add to do"
router.get('/addtodo', function(req, res, next) {
    res.render('addtodo', {
        title: 'Add To Do'
    });
});

// POST handle form data for "Add to do" 
router.post('/addtodo', function(req, res, next) {
    //function from controllers that writes to do into database
    controller.postTodo(req, res, next);                                  
    res.redirect('/');
});

// GET page with finished to dos
router.get('/finishedtodos', function(req, res, next){
    res.render('finishedtodos', {
        title: 'Finished To Dos'
    });
})

// GET page with overwritten to dos
router.get('/overwrittentodos', function(req, res, next){
    res.render('overwrittentodos', {
        title: 'Overwritten To Dos'
    });
})

module.exports = router;
