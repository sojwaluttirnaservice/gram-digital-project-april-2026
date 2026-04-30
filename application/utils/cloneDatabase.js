const { spawn } = require("child_process");
const path = require("path");

function cloneDatabase(oldDb, newDb) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../../scripts/clone_db.sh");

    const process = spawn("bash", [scriptPath, oldDb, newDb]);

    let output = "";
    let error = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(error || "DB clone failed"));
      }
    });
  });
}


module.exports = {
    cloneDatabase
}