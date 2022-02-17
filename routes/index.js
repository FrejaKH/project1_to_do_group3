var express = require('express');
var router = express.Router();
const TITLE = 'Employee Pattern Project';
const con = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
        title: TITLE,
        subtitle: 'Front Page'
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
/* GET show html form for departments */
router.get('/deptform', function(req, res, next) {
    res.render('deptformv', {
        title: TITLE,
        subtitle: 'Department Entry Form'
    });
});
/* POST handle form data for departments */
router.post('/deptform', function(req, res, next) {
    con.postDept(req, res, next);                                   // write department into db
    res.redirect('/');
});

module.exports = router;
