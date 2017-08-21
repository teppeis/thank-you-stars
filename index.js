'use strict';

const path = require('path');
const GitHub = require('github');
const PQueue = require('p-queue');
const getGitRepoInfoFromPackage = require('./lib/getGitRepoInfoFromPackage');
const loadJson = require('./lib/loadJson');

function thankYou(pkgJson, config) {
  const queue = new PQueue({concurrency: 2});
  const opts = {
    timeout: 5000,
  };
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
    let pkg;
    try {
      pkg = loadJson(pkgJsonPath);
    } catch (e) {
      console.error(`Skipped ${pkgName}: ${e.message}`);
      continue;
    }
    const repoInfo = getGitRepoInfoFromPackage(pkg);
    if (repoInfo &&
      repoInfo.type === 'github' &&
      repoInfo.domain === 'github.com') {
      const user = repoInfo.user;
      const project = repoInfo.project;
      queue.add(() => api.activity.starRepo({owner: user, repo: project})
        .then(() => console.log(`Starred! ${pkgName}: https://github.com/${user}/${project}`))
        .catch(e => console.error(e)));
    }
  }
}

module.exports = thankYou;
