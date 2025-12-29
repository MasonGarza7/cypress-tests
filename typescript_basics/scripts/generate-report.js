const path = require("path");
const fs = require("fs");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");

async function main() {
  const jsonsDir = path.resolve(__dirname, "..", "results", "reports", ".jsons");
  const outDir = path.resolve(__dirname, "..", "results", "reports");

  if (!fs.existsSync(jsonsDir)) {
    throw new Error(`Missing folder: ${jsonsDir}`);
  }

  const files = fs
    .readdirSync(jsonsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join(jsonsDir, f));

  if (files.length === 0) {
    throw new Error(`No mochawesome JSON files found in: ${jsonsDir}`);
  }

  const merged = await merge({ files });

  await marge.create(merged, {
    reportDir: outDir,
    reportFilename: "report",
    html: true,
    json: false,
    overwrite: true,
    inlineAssets: true
  });

  console.log("[report] Wrote results/reports/report.html");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
