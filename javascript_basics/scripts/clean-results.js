const fs = require("fs");
const path = require("path");

function rm(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

const root = process.cwd();

rm(path.join(root, "results", "reports", ".json"));          // raw mochawesome json
rm(path.join(root, "results", "reports", "mochawesome.json"));// merged json
rm(path.join(root, "results", "results", "mochawesome.json")); // no-op safety (ignore if missing)
rm(path.join(root, "results", "reports", "report.html"));     // final html

// Recreate base folders used by reporting
fs.mkdirSync(path.join(root, "results", "reports", ".json"), { recursive: true });

console.log("Cleaned results/reports/ (kept screenshots, videos, logs)");
