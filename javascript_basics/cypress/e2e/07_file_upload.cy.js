const path = require("path");

describe("File Upload", () => {
  const tempDir = "temp_files";
  const fileName = "upload_test_file.txt";

  afterEach(() => {
    cy.task("deleteTempFile", { tempDir, fileName });
  });

  it("should upload a file successfully", () => {
    const testName = "File Upload";
    cy.logStart(testName);

    const url = "https://the-internet.herokuapp.com/upload";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    const fileContents = "This is a temp file for upload testing.";

    cy.task("createTempFile", { tempDir, fileName, contents: fileContents });

    const absolutePath = path.join(Cypress.config("projectRoot"), tempDir, fileName);

    cy.task("logLine", { message: `Using temp file: ${absolutePath}` }, { log: false });
    cy.task("logLine", { message: "Selecting file in upload input" }, { log: false });
    cy.get("#file-upload").selectFile(absolutePath);

    cy.task("logLine", { message: "Clicking Upload button" }, { log: false });
    cy.get("#file-submit").click();

    cy.task("logLine", { message: "Verifying upload success" }, { log: false });
    cy.get("h3").should("have.text", "File Uploaded!");
    cy.get("#uploaded-files").should("contain.text", fileName);

    cy.task("logLine", { message: "Upload success confirmed" }, { log: false });
    cy.task("logEnd", { title: testName }, { log: false });
  });
});
