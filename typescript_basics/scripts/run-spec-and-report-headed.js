const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

// Forward --spec argument from npm
const specIndex = process.argv.indexOf("--spec");
const specArg =
  specIndex !== -1 ? ["--spec", process.argv[specIndex + 1]] : [];

const cyExit = run("npx", [
  "cypress",
  "run",
  "--headed",
  "--browser",
  "chrome",
  ...specArg
]);

// Always generate report
run("node", ["scripts/generate-report.js"]);

// Preserve Cypress exit code
process.exit(cyExit);
