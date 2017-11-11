#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const loadJson = require('../lib/loadJson');
const thankYou = require('../');

const configPath = path.join(getUserHome(), '.thank-you-stars.json');

let config = {};
if (fs.existsSync(configPath)) {
  config = loadJson(configPath);
}

// check if the token is set, otherwise we try taking it from env var.
config.token = config.token || process.env.GITHUB_TOKEN;

if (!config.token) {
  console.error(`You need to either store your Github token to ${configPath} `
     + 'or set your Github Token as a environment variable \'GITHUB_TOKEN\'.');
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