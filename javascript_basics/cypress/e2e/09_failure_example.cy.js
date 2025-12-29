describe("Failure Example", () => {
  it("should intentionally fail to test screenshot-on-failure", () => {
    const testName = "Intentional Failure Example";
    cy.logStart(testName);

    // Navigate to homepage
    const url = "https://the-internet.herokuapp.com/";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: testName, message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    // Intentionally locate something that does not exist
    cy.task(
      "logLine",
      { message: "Attempting to locate a NON-EXISTENT element to force failure" },
      { log: false }
    );

    // This selector is INVALID ON PURPOSE
    cy.get("#this-element-does-not-exist").should("exist");

    // This line should never be reached
    cy.task(
      "logLine",
      { message: "This log should never appear, the test should fail earlier" },
      { log: false }
    );
  });
});
