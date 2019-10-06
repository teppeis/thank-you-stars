"use strict";

const hostedGitInfo = require("hosted-git-info");
const normalize = require("normalize-package-data");

function getGitRepoInfoFromPackage(pkg) {
  normalize(pkg);
  if (pkg.repository && pkg.repository.type === "git") {
    return hostedGitInfo.fromUrl(pkg.repository.url);
  }
  return null;
}

module.exports = getGitRepoInfoFromPackage;
