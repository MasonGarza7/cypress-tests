const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  return result.status ?? 1;
}

const jsonDir = path.join(process.cwd(), "results", "reports", ".json");

if (!fs.existsSync(jsonDir)) {
  console.log("No report JSON directory found. Skipping HTML report generation.");
  process.exit(0);
}

const files = fs.readdirSync(jsonDir).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.log("No mochawesome JSON files found. Skipping HTML report generation.");
  process.exit(0);
}

const mergeCode = run("npx", [
  "mochawesome-merge",
  "results/reports/.json/*.json",
  "-o",
  "results/reports/mochawesome.json"
]);

if (mergeCode !== 0) process.exit(mergeCode);

const htmlCode = run("npx", [
  "marge",
  "results/reports/mochawesome.json",
  "-f",
  "report",
  "-o",
  "results/reports"
]);

process.exit(htmlCode);
