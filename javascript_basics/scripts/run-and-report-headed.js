const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

const cypressCode = run("npx", ["cypress", "run", "--headed", "--browser", "chrome"]);
run("node", ["scripts/generate-report.js"]);

process.exit(cypressCode);
