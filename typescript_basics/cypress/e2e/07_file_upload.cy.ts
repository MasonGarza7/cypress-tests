import path from "path";

describe("File Upload", () => {
  const tempDir = "temp_files";
  const fileName = "upload_test_file.txt";

  afterEach(() => {
    cy.task("deleteTempFile", { tempDir, fileName });
  });

  it("should upload a file successfully", () => {
    cy.logStart("File Upload");

    const url = "https://the-internet.herokuapp.com/upload";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    const fileContents = "This is a temp file for upload testing.";

    cy.task("createTempFile", { tempDir, fileName, contents: fileContents });

    const absolutePath = path.join(Cypress.config("projectRoot"), tempDir, fileName);

    cy.task("log", `Using temp file: ${absolutePath}`);
    cy.task("log", "Selecting file in upload input");
    cy.get("#file-upload").selectFile(absolutePath);

    cy.task("log", "Clicking Upload button");
    cy.get("#file-submit").click();

    cy.task("log", "Verifying upload success");
    cy.get("h3").should("have.text", "File Uploaded!");
    cy.get("#uploaded-files").should("contain.text", fileName);

    cy.task("log", "Upload success confirmed");
    cy.task("log", "ENDING Test --- File Upload ---");
  });
});
