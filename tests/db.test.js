const assert = require("assert");
const { spawnSync } = require("child_process");
const path = require("path");

const scriptPath = path.join(__dirname, "..", "server", "config", "db.js");
const child = spawnSync(process.execPath, ["-e", `
  process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/does-not-exist';
  const connectDB = require(${JSON.stringify(scriptPath)});
  connectDB().then((result) => {
    console.log(JSON.stringify({ result }));
    process.exit(result ? 0 : 0);
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
`], {
  cwd: path.join(__dirname, ".."),
  encoding: "utf8",
});

assert.strictEqual(child.status, 0, child.stderr || child.stdout);
assert.match(child.stdout, /"result":false/);
console.log("✅ Database bootstrap test passed");
