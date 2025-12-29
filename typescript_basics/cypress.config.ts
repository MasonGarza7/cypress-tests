import { defineConfig } from "cypress";
import logger from "./scripts/logger";
import fs from "fs";
import path from "path";

const startedTests = new Set<string>();
const oncePerRun = new Set<string>();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        logStart({ spec, title }: { spec: string; title: string }) {
          const key = `${spec}::${title}`;

          if (!startedTests.has(key)) {
            startedTests.add(key);
            logger.info(`STARTING TEST: ${title}`);
          }

          return null;
        },

        // Use for lifecycle messages that should only appear once per run
        logOnce({ key, message }: { key: string; message: string }) {
          if (!oncePerRun.has(key)) {
            oncePerRun.add(key);
            logger.info(message);
          }

          return null;
        },

        // Create a temp file under <projectRoot>/<tempDir>/<fileName>
        createTempFile({
          tempDir,
          fileName,
          contents
        }: {
          tempDir: string;
          fileName: string;
          contents: string;
        }) {
          const dirPath = path.resolve(config.projectRoot, tempDir);
          fs.mkdirSync(dirPath, { recursive: true });

          const filePath = path.join(dirPath, fileName);
          fs.writeFileSync(filePath, contents, "utf8");

          logger.info(`Created temp file: ${filePath}`);
          return null;
        },

        // Delete a temp file under <projectRoot>/<tempDir>/<fileName>
        deleteTempFile({ tempDir, fileName }: { tempDir: string; fileName: string }) {
          const filePath = path.resolve(config.projectRoot, tempDir, fileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`Deleted temp file: ${filePath}`);
          }

          return null;
        },

        // Normal log (may appear more than once if Cypress re-evaluates a step)
        log(message: string) {
          logger.info(message);
          return null;
        }
      });

      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.ts",
  },

  screenshotsFolder: "results/screenshots",
  videosFolder: "results/videos",

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "results/reports",
    overwrite: false,
    html: true,
    json: true
  }
});
