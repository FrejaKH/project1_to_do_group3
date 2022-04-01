"use strict";

const rock = require("./../controllers/rockyou");

let forbiddenWords = rock.getRockyou();

console.log(`driver:\n${forbiddenWords.substring(0, 100)}`);

// search for entered password in forbiddenwords
// use regular re.test(), hvor re er et Regular Expressi
