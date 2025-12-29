const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

const cyExit = run("npx", ["cypress", "run"]);
run("node", ["scripts/generate-report.js"]);

// Preserve the Cypress exit code so CI still fails when tests fail
process.exit(cyExit);
