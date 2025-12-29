const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const logger = require("./scripts/logger");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    screenshotsFolder: "results/screenshots",
    videosFolder: "results/videos",
    video: true,

    setupNodeEvents(on, config) {
      // De-dupe START logs across Cypress re-evaluations
      const started = new Set();
      // De-dupe selected log lines across Cypress re-evaluations
      const onceLines = new Set();

      on("before:run", () => {
        ensureDir("results/logs");
        ensureDir("results/reports");
        ensureDir("results/reports/.json");
        ensureDir("results/screenshots");
        ensureDir("results/videos");

        started.clear();
        onceLines.clear();
      });

      on("task", {
        // Generic log line (info)
        logLine({ message }) {
          logger.info(message);
          return null;
        },

        // Log a line exactly once per (spec + title + message)
        logOnce({ spec, title, message }) {
          const key = `${spec}::${title}::${message}`;
          if (onceLines.has(key)) return null;
          onceLines.add(key);

          logger.info(message);
          return null;
        },

        // Log "STARTING" exactly once per (spec + title)
        logStart({ spec, title }) {
          const key = `${spec}::${title}`;
          if (started.has(key)) return null;
          started.add(key);

          logger.info(`STARTING Test --- ${title} ---`);
          return null;
        },

        // Log "FINISHED"
        logEnd({ title }) {
          logger.info(`FINISHED Test --- ${title} ---`);
          return null;
        },

        createTempFile({ tempDir, fileName, contents }) {
          const dirPath = path.join(process.cwd(), tempDir);
          fs.mkdirSync(dirPath, { recursive: true });

          const filePath = path.join(dirPath, fileName);
          fs.writeFileSync(filePath, contents ?? "", { encoding: "utf8" });

          logger.info(`Temp file created: ${filePath}`);
          return null;
        },

        deleteTempFile({ tempDir, fileName }) {
          const filePath = path.join(process.cwd(), tempDir, fileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`Temp file deleted: ${filePath}`);
          }

          return null;
        }
      });

      return config;
    }
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "results/reports/.json",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  }
});
