var express = require("express");
var router = express.Router();
const TITLE = 'Todo';
const controller = require('../controllers/controller');
/* GET index page. */ // Need to clean this up
router.get("/todolist", async function (req, res, next) {
    const user = req.signedCookies.User;
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
        }else{
    let todolist = await controller.getTodo({}, { sort: { priority: 1 } });
    controller.getTodo({}, { sort: { priority: 1 } }).then(function (results) {
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
    const user = req.signedCookies.User;
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
router.post("/addtodo", function (req, res, next) {
<<<<<<< HEAD
  controller.postTodo(req, res, next); // write to dos into db
=======
    const user = req.signedCookies.User;
    if(typeof(req.signedCookies.User) === "undefined"){
        res.render('login', {
              title: TITLE,
              subtitle: 'Login'
          });
        }else{
  controller.postTodo(req, res, next, user); // write department into db
>>>>>>> b5f07f1e3eae9f5bd60987bcc7a722f385c35f82
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
