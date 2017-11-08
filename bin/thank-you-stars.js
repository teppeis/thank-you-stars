#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const loadJson = require('../lib/loadJson');
const thankYou = require('../');

const config = {
  token: process.env.GITHUB_TOKEN,
};

if (!config.token) {
  console.error('You need to set your Github Token as a environment variable `GITHUB_TOKEN`.');
  process.exit(1);
}

if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.error('Run `npm install` before');
  process.exit(1);
}
const pkgPath = path.join(process.cwd(), 'package.json');
const pkgJson = loadJson(pkgPath);

thankYou(pkgJson, config);
