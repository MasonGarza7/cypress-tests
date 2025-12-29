const { spawnSync } = require("child_process");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

// Parse --spec from CLI args (supports: node scripts/test-spec.js --spec path)
const specIndex = process.argv.indexOf("--spec");
const specValue = specIndex !== -1 ? process.argv[specIndex + 1] : null;

if (!specValue || typeof specValue !== "string") {
  console.error(
    "[test:spec] Missing --spec <path>. Example: npm run test:spec -- --spec cypress/e2e/03_checkboxes.cy.ts"
  );
  process.exit(1);
}

// 1) Run Cypress headless for a single spec
const cyExit = run("npx", ["cypress", "run", "--spec", specValue]);

// 2) Always generate the report (even if Cypress failed)
run("node", ["scripts/generate-report.js"]);

// 3) Preserve Cypress exit code
process.exit(cyExit);
