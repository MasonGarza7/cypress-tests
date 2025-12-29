const fs = require("fs");
const path = require("path");
const winston = require("winston");

const logsDir = path.resolve(__dirname, "..", "results", "logs");
fs.mkdirSync(logsDir, { recursive: true });

// const timestamp = new Date()
//   .toISOString()
//   .replace(/[:.]/g, "-");
function localTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_` +
         `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

const timestamp = localTimestamp();

const logFile = path.join(logsDir, `run_${timestamp}.log`);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}] ${message}`
    )
  ),
  transports: [
    new winston.transports.File({ filename: logFile }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
