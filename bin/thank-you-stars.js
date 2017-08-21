#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const loadJson = require('../lib/loadJson');
const thankYou = require('../');

const configPath = path.join(getUserHome(), '.thank-you-stars.json');
if (!fs.existsSync(configPath)) {
  console.error(`Save your token as ${configPath}`);
  process.exit(1);
}
const config = loadJson(configPath);

if (!config.token) {
  console.error('`token` property is not found in .thank-you-stars.json');
  process.exit(1);
}

if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.error('Run `npm install` before');
  process.exit(1);
}
const pkgPath = path.join(process.cwd(), 'package.json');
const pkgJson = loadJson(pkgPath);

thankYou(pkgJson, config);

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}
