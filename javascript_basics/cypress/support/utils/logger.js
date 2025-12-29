function write(level, message) {
  cy.log(`[${level}] ${message}`);
  cy.task(
    "logToFile",
    { level, message },
    { log: false }
  );
}

export function logInfo(message) {
  write("INFO", message);
}

export function logStep(message) {
  write("STEP", message);
}

export function logError(message) {
  write("ERROR", message);
}
