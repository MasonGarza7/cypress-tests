const fs = require("fs");
const path = require("path");

fs.rmSync(path.join(process.cwd(), "results"), { recursive: true, force: true });
console.log("Purged results/ (reports, screenshots, videos, logs)");
