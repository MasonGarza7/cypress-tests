describe("Failure Example", () => {
  it("should intentionally fail to test screenshot-on-failure", () => {
    cy.logStart("Intentional Failure Example");

    // STEP 1 — Navigate to homepage
    const url = "https://the-internet.herokuapp.com/";
    cy.task("logOnce", {
      key: `NAV:${Cypress.spec.relative}:${url}`,
      message: `Navigating to ${url}`
    });
    cy.visit(url);

    // STEP 2 — Intentionally locate something that does not exist
    cy.task("log", "Attempting to locate a NON-EXISTENT element to force failure");

    // This selector is INVALID ON PURPOSE
    cy.get("#this-element-does-not-exist").should("exist");

    // This line should never be reached
    cy.task("log", "This log should never appear, the test should fail earlier");
  });
});
