'use strict';

const path = require('path');
const GitHub = require('github');
const PQueue = require('p-queue');
const getGitRepoInfoFromPackage = require('./lib/getGitRepoInfoFromPackage');
const loadJson = require('./lib/loadJson');

function thankYou(pkgJson, config) {
  const queue = new PQueue({concurrency: 2});
  const opts = {};
  if (process.env.DEBUG) {
    opts.debug = true;
  }
  const api = new GitHub(opts);
  api.authenticate({
    type: 'token',
    token: config.token,
  });

  const deps = Object.assign({}, pkgJson.dependencies, pkgJson.devDependencies);
  for (const pkgName in deps) {
    const pkgJsonPath = path.join(process.cwd(), 'node_modules', pkgName, 'package.json');
    const pkg = loadJson(pkgJsonPath);
    const repoInfo = getGitRepoInfoFromPackage(pkg);
    if (repoInfo &&
      repoInfo.type === 'github' &&
      repoInfo.domain === 'github.com') {
      queue.add(() => star(api, repoInfo.user, repoInfo.project));
    }
  }
}

function star(api, user, repo) {
  return api.activity.starRepo({owner: user, repo: repo})
    .then(() => console.log(`Starred! https://github.com/${user}/${repo}`))
    .catch(e => console.error(e));
}

module.exports = thankYou;
