const fs = require("fs");
const path = require("path");

const jsonDir = path.resolve(__dirname, "..", "results", "reports", ".jsons");

if (fs.existsSync(jsonDir)) {
  fs.rmSync(jsonDir, { recursive: true, force: true });
}

fs.mkdirSync(jsonDir, { recursive: true });

console.log("[clean] Cleared previous mochawesome JSON reports");
