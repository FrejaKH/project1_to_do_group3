var express = require("express");
var router = express.Router();
const controller = require("../controllers/controller");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let todolist = await controller.getTodo({}, { sort: { priority: 1 } });
  controller.getTodo({}, { sort: { priority: 1 } }).then(function (results) {
    let todos = results.filter(function (todo) {
      return !todo.done;
    });
    let doneTodos = results.filter(function (todo) {
      return todo.done;
    });
    res.render("index", {
      title: `test`,
      subtitle: "Display Departments",
      todos: todos,
      doneTodos: doneTodos,
      todolist,
    });
  });
});

/* GET show html form for departments */
router.get("/addtodo", function (req, res, next) {
  res.render("addtodo", {
    title: "Add To Do",
  });
});

/* POST handle form data for departments */
router.post("/addtodo", function (req, res, next) {
  controller.postTodo(req, res, next); // write department into db
  res.redirect("/");
});

/* Btn */
router.post("/:id/completed", function (req, res, next) {
  controller.checkBtn(req, res, next);
  res.redirect("/");
});

// GET page with finished to dos
router.get("/finishedtodos", function (req, res, next) {
  res.render("finishedtodos", {
    title: "Finished To Dos",
  });
});

// GET page with overwritten to dos
router.get("/overwrittentodos", function (req, res, next) {
  res.render("overwrittentodos", {
    title: "Overwritten To Dos",
  });
});

module.exports = router;
