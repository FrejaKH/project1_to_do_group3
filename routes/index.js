var express = require("express");
var router = express.Router();
const TITLE = 'Todo';
const controller = require('../controllers/controller');
const usercontroller = require('../controllers/userController');

/* GET index page. */ // Need to clean this up
router.get("/todolist", async function (req, res, next) {
  const user = req.signedCookies.User;
  const userarr = user.split(",");
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
        }else{
    let todolist = await controller.getTodo({userId: userarr[1]}, { sort: { priority: 1 } });
    controller.getTodo({userId: userarr[1]}, { sort: { priority: 1 } }).then(function (results) {
        let todos = results.filter(function (todo) {
        return !todo.done;
        });
        let doneTodos = results.filter(function (todo) {
            return todo.done;
          });
          let expiredTodos = results.filter(function (todo) {
            if (new Date() > todo.deadline) {
              todo.expired = true;
            }
            return todo.expired;
          });
          res.render("todolist", {
            todos: todos,
            doneTodos: doneTodos,
            expiredTodos: expiredTodos,
            todolist,
            user: req.signedCookies.User,

          });
        });
    }
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('welcome', {
          title: TITLE,
          subtitle: 'Welcome'
      });
    });
// GET page with "Add to do"
router.get('/addtodo', function(req, res, next) {
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
        }else{
        res.render('addtodo', {
            title: 'Add To Do',
            user: req.signedCookies.User,
        });
}
});

/* POST function that uses a function from controller to post data into the database */
router.post("/addtodo", async function (req, res, next) {
  const user = req.signedCookies.User;
  const userarr = user.split(",");
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
    }else{
        controller.postTodo(req, res, next, userarr[1]); // write to dos into db
        res.redirect("/todolist");
        }
});


/* Index page btn */
router.post("/todolist/:id/completed", function (req, res, next) {
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
        }else{
  controller.checkBtn(req, res, next);
  res.redirect("/todolist");
        }
});


module.exports = router;
