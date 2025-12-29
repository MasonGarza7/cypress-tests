const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

// Run Cypress headed (full suite)
const cyExit = run("npx", ["cypress", "run", "--headed", "--browser", "chrome"]);

// Always generate the report afterward
run("node", ["scripts/generate-report.js"]);

// Preserve Cypress exit code
process.exit(cyExit);
