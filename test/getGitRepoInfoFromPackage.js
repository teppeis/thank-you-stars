"use strict";

const assert = require("assert");
const getGitRepoInfo = require("../lib/getGitRepoInfoFromPackage");

describe("getGitRepoInfoFromPackage", () => {
  it("string: npm/ini", () => {
    const info = getGitRepoInfo({ repository: "npm/ini" });
    assert.equal(info.type, "github");
    assert.equal(info.domain, "github.com");
    assert.equal(info.user, "npm");
    assert.equal(info.project, "ini");
  });

  it("object: https://github.com/npm/ini.git", () => {
    const info = getGitRepoInfo({
      repository: {
        type: "git",
        url: "https://github.com/npm/ini.git",
      },
    });
    assert.equal(info.type, "github");
    assert.equal(info.domain, "github.com");
    assert.equal(info.user, "npm");
    assert.equal(info.project, "ini");
  });

  it("no repository property", () => {
    const info = getGitRepoInfo({});
    assert.equal(info, null);
  });

  it("no git repo", () => {
    const info = getGitRepoInfo({
      repository: {
        type: "svn",
        url: "https://v8.googlecode.com/svn/trunk/",
      },
    });
    assert.equal(info, null);
  });

  it("gist", () => {
    const info = getGitRepoInfo({
      repository: {
        type: "git",
        url: "gist:4c815a58358aed6a9fc4fa856fc4c57f",
      },
    });
    assert.equal(info.type, "gist");
  });

  it("bitbucket", () => {
    const info = getGitRepoInfo({
      repository: {
        type: "git",
        url: "bitbucket:example/repo",
      },
    });
    assert.equal(info.type, "bitbucket");
  });
});
