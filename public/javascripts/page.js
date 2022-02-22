"use strict";
const $ = function (nml) {
  return document.getElementById(nml);
};

const validate = function (e) {
  // validation example, if not alike, prevent submission
  if ($("registerForm").password.value !== $("registerForm").password1.value) {
    e.preventDefault();
    window.alert("Two entered passwords do not match");
    console.log($("registerForm").password + ":" + $("registerForm").password1);
    $("password").select();
    return false;
  }
};

const init = function () {
  if ($("registerForm")) {
    // looking for particular form, if found setup validation
    $("registerForm").addEventListener("submit", validate);
  }
};
window.addEventListener("load", init);

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction() {
  var myDIV = document.getElementById("myDIV");
  var moveto = document.getElementById("moveto");
  moveto.append(myDIV);
}
