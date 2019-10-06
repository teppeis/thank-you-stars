"use strict";

const fs = require("fs");

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path));
}

module.exports = loadJson;
