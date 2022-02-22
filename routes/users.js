var express = require("express");
var router = express.Router();
const TITLE = "Employee Pattern Project";
const con = require("../controllers/userController");
const dep = require("../controllers/controller");

/* GET users listing.  This is a DUMMY this route is caught in index.js */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* GET show html form for users */
router.get("/register", async function (req, res, next) {
  let departments = await dep.getDepts({}); // read departments, users work in them
  res.render("register", {
    title: TITLE,
    subtitle: "Register User",
    departments,
  });
});
/* POST handle form data for users */
router.post("/register", function (req, res, next) {
  con.postUser(req, res, next); // write user into db
  res.redirect("/"); // go to front page
});

module.exports = router;
