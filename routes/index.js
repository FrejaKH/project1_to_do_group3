var express = require("express");
var router = express.Router();
const controller = require("../controllers/controller");

/* GET index page. */ // Need to clean this up
router.get("/", async function (req, res, next) {
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
    res.render("index", {
      title: `test`,
      todos: todos,
      doneTodos: doneTodos,
      expiredTodos: expiredTodos,
      todolist,
    });
  });
});

/* GET page with "add to do" */
router.get("/addtodo", function (req, res, next) {
  res.render("addtodo", {
    title: "Add To Do",
  });
});

/* POST function that uses a function from controller to post data into the database */
router.post("/addtodo", function (req, res, next) {
  controller.postTodo(req, res, next); // write department into db
  res.redirect("/");
});

/* Index page btn */
router.post("/:id/completed", function (req, res, next) {
  controller.checkBtn(req, res, next);
  res.redirect("/");
});

module.exports = router;
