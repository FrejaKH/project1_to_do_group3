"use strict";
const fs = require("fs");

/*
 * Rockyou as Singleton
 */
class Rockyou {
  static rockyou = "";
  static filename = "controllers/rockyou.txt";

  constructor() {
    // Rockyou.rockyou = fs.readdirSync("./");
    // console.log(Rockyou.rockyou);
    Rockyou.rockyou = fs.readFileSync(Rockyou.filename, "utf8");
  }

  static getRockyou() {
    if (Rockyou.rockyou === "") {
      let t = new Rockyou();
    }
    return Rockyou.rockyou;
  }
}

module.exports = {
  getRockyou: function () {
    // console.log(Rockyou.getRockyou().substring(0, 100));
    return Rockyou.getRockyou().substring(0, 100);
  },
};
