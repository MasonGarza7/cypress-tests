const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

const spec = process.argv[2];
if (!spec) {
  console.error("Usage: node scripts/test-spec.js <specPath>");
  process.exit(2);
}

const cypressCode = run("npx", ["cypress", "run", "--spec", spec]);
run("node", ["scripts/generate-report.js"]);

process.exit(cypressCode);
