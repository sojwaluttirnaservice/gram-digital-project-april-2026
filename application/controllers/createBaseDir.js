const baseDir = "./public";
const fs = require("fs");
const { UPLOAD_PATHS } = require("../config/uploadPaths");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createBaseDir = () => {
  ensureDir(baseDir);

  const collectPaths = (obj) => {
    Object.values(obj).forEach((value) => {
      if (typeof value === "string") {
        ensureDir(value);
      } else {
        collectPaths(value);
      }
    });
  };

  collectPaths(UPLOAD_PATHS);
};

module.exports = {
  baseDir,
  createBaseDir,
};
