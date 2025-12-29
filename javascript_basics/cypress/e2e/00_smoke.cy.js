describe("Smoke", () => {
  it("writes a log line and visits a page", () => {
    cy.logStart("Smoke");

    const url = "https://the-internet.herokuapp.com/";
    cy.task(
      "logOnce",
      { spec: Cypress.spec.relative, title: "Smoke", message: `Navigating to ${url}` },
      { log: false }
    );
    cy.visit(url);

    cy.contains("Welcome to the-internet").should("be.visible");

    cy.task("logEnd", { title: "Smoke" }, { log: false });
  });
});
